import { AdminStorePage } from "@/components/templates/AdminStorePage";
import { useMutation, useQuery, useQueryClient } from "react-query";
import useApiError from "@/lib/hooks/useApiError";
import { useRecoilValue } from "recoil";
import { categoryState } from "@/recoil/category";
import { useEffect, useState } from "react";
import {
  getAdminStorePosts,
  hiddenPostAPI,
  promotionAPI,
  promotionRoleAPI,
  updatePostSortAPI,
} from "@/apis/postsApi";
import { useRouter } from "next/router";

const AdminStore = () => {
  const router = useRouter();
  const [error, setError] = useState("");

  const queryClient = useQueryClient();
  const [promotion, setPromotion] = useState(false);
  const { handleError } = useApiError();
  const [searchInput, setSearchInput] = useState("");
  const [storeSearchKeyword, setStoreSearchKeyword] = useState("");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(20);
  const currentCategory = useRecoilValue(categoryState);

  /** 입력할 때마다 전체 조회하지 않도록 검색어를 짧게 지연해 서버에 전달한다. */
  useEffect(() => {
    const timer = window.setTimeout(() => {
      setStoreSearchKeyword(searchInput.trim());
      setPage(1);
    }, 300);

    return () => window.clearTimeout(timer);
  }, [searchInput]);

  useEffect(() => {
    setPage(1);
  }, [currentCategory]);

  const storeQueryKey = [
    "getAdminStorePosts",
    storeSearchKeyword,
    currentCategory,
    promotion,
    page,
    pageSize,
  ];

  /** 업체 목록을 현재 페이지 분량만 불러오기 */
  const { data: pageData, isLoading, isFetching } = useQuery(
    storeQueryKey,
    getAdminStorePosts,
    {
      keepPreviousData: true,
      onError(error: any) {
        handleError(error);
      },
    }
  );

  const rows: any[] = Array.isArray(pageData?.items) ? pageData.items : [];
  const total = Number(pageData?.total ?? 0);
  const totalPages = Number(pageData?.totalPages ?? 0);

  useEffect(() => {
    if (totalPages > 0 && page > totalPages) {
      setPage(totalPages);
    }
  }, [page, totalPages]);

  const promotionMutation = useMutation(["promotionAPI"], promotionAPI, {
    onSuccess() {
      queryClient.refetchQueries(["getAdminStorePosts"]);
    },
  });

  /** 상세보기 클릭 시 업체정보 수정창 바로가기 */
  const goEdit = (e: any) => {
    router.push(`/admin/store/edit/${e.oid}`);
  };

  const promotionHandler = (data: any) => {
    promotionMutation.mutate(data.data.oid);
  };

  const hiddenMutation = useMutation(hiddenPostAPI, {
    onSuccess() {
      queryClient.refetchQueries(["getAdminStorePosts"]);
      setError("");
    },
    onError(error: any) {
      setError(
        error?.response?.data?.message ?? "업체 노출 상태 변경에 실패했습니다."
      );
    },
  });

  const changePromotionOrderMutation = useMutation(
    ["promotionRoleAPI"],
    promotionRoleAPI,
    {
      onSuccess() {
        queryClient.refetchQueries(["getAdminStorePosts"]);
        setError("");
      },
      onError(error: any) {
        // 응답이 없는 에러(네트워크 등)에도 안전하게 메시지 처리
        setError(
          error?.response?.data?.message ?? "오류가 발생했습니다."
        );
      },
    }
  );

  const onChangeOrder = (
    e: React.ChangeEvent<HTMLSelectElement>,
    data: any
  ) => {
    setError("");
    const datas = {
      oid: data.data.oid,
      order: e.target.value,
    };
    changePromotionOrderMutation.mutate(datas);
  };

  const h = 5;
  const w = 5;
  const orderOptions = Array(h * w)
    .fill(0)
    .map((arr, i) => {
      // (arr: 현재값, i:인덱스)
      return { name: i };
    });

  /** 사용자 화면 업체 노출 순서 변경 */
  const changeSortMutation = useMutation(
    ["updatePostSortAPI"],
    updatePostSortAPI,
    {
      async onMutate(variables: { oid: string; sort: number }) {
        await queryClient.cancelQueries(["getAdminStorePosts"]);
        const previous = queryClient.getQueryData(storeQueryKey);
        return { previous };
      },
      onError(error: any, _variables, context: any) {
        // 실패하면 이동 전 목록으로 되돌린다
        if (context?.previous) {
          queryClient.setQueryData(storeQueryKey, context.previous);
        }
        setError(
          error?.response?.data?.message ??
            "업체 노출 순서 변경에 실패했습니다."
        );
      },
      onSuccess() {
        setError("");
      },
      onSettled() {
        // 성공/실패와 무관하게 서버 기준으로 최종 동기화
        queryClient.invalidateQueries(["getAdminStorePosts"]);
      },
    }
  );

  const onChangeSort = (
    e: React.ChangeEvent<HTMLSelectElement>,
    data: any
  ) => {
    setError("");
    // 화면은 1번부터 표시하므로 서버의 0-based 인덱스로 변환
    changeSortMutation.mutate({
      oid: data.data.oid,
      sort: Number(e.target.value) - 1,
    });
  };

  // 노출 순서 선택지: 현재 페이지 수가 아니라 전체 업체 수를 기준으로 만든다.
  const sortTotal = Math.max(
    total,
    ...rows.map((row) => Number(row?.sort ?? 0) + 1),
    0
  );
  const sortOptions = Array(sortTotal)
    .fill(0)
    .map((_, i) => ({ name: i + 1 }));

  return (
    <>
      <AdminStorePage
        setStoreSearchKeyword={setSearchInput}
        setPromotion={(checked) => {
          setPromotion(checked);
          setPage(1);
        }}
        dataSource={rows}
        isLoading={isLoading || isFetching}
        page={page}
        pageSize={pageSize}
        total={total}
        totalPages={totalPages}
        rowNumberOffset={(page - 1) * pageSize}
        onPageChange={setPage}
        onPageSizeChange={(nextPageSize) => {
          setPageSize(nextPageSize);
          setPage(1);
        }}
        error={error}
        promotionHandler={promotionHandler}
        hiddenHandler={(data) => hiddenMutation.mutate(data.data.oid)}
        orderOptions={orderOptions}
        onChangeOrder={onChangeOrder}
        sortOptions={sortOptions}
        onChangeSort={onChangeSort}
        goEdit={goEdit}
      />
    </>
  );
};

export default AdminStore;
