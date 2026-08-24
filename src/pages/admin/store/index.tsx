import { AdminStorePage } from "@/components/templates/AdminStorePage";
import {
  QueryCache,
  QueryClient,
  dehydrate,
  useMutation,
  useQuery,
  useQueryClient,
} from "react-query";
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
  const [storeSearchKeyword, setStoreSearchKeyword] = useState("");
  const currentCategory = useRecoilValue(categoryState);

  /** 업체 목록 불러오기 */
  const { data: dataSource, isLoading } = useQuery(
    ["getAdminStorePosts", storeSearchKeyword, currentCategory, promotion],
    getAdminStorePosts,
    {
      onError(error: any) {
        handleError(error);
      },
    }
  );

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

  /** 사용자 화면 업체 노출 순서 변경 — 서버 응답을 기다리지 않고
   *  캐시된 목록을 먼저 재배열(낙관적 업데이트)해 체감 지연을 없앤다 */
  const storeQueryKey = [
    "getAdminStorePosts",
    storeSearchKeyword,
    currentCategory,
    promotion,
  ];
  const changeSortMutation = useMutation(
    ["updatePostSortAPI"],
    updatePostSortAPI,
    {
      async onMutate(variables: { oid: string; sort: number }) {
        await queryClient.cancelQueries(["getAdminStorePosts"]);
        const previous = queryClient.getQueryData(storeQueryKey);
        queryClient.setQueryData(storeQueryKey, (old: any) => {
          if (!Array.isArray(old)) return old;
          const next = [...old];
          const fromIndex = next.findIndex(
            (row: any) => row.oid === variables.oid
          );
          if (fromIndex === -1) return old;
          const [moved] = next.splice(fromIndex, 1);
          const toIndex = Math.max(0, Math.min(variables.sort, next.length));
          next.splice(toIndex, 0, moved);
          // 서버와 동일하게 0..n-1 재채번한 값으로 셀렉트 표시도 즉시 갱신
          return next.map((row: any, index: number) => ({
            ...row,
            sort: index,
          }));
        });
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

  // 노출 순서 선택지: 1 ~ 전체 업체 수 (필터로 목록이 줄면 서버 sort 최대값 기준으로 보정)
  const rows: any[] = Array.isArray(dataSource) ? dataSource : [];
  const sortTotal = Math.max(
    rows.length,
    ...rows.map((row) => Number(row?.sort ?? 0) + 1),
    0
  );
  const sortOptions = Array(sortTotal)
    .fill(0)
    .map((_, i) => ({ name: i + 1 }));

  return (
    <>
      <AdminStorePage
        setStoreSearchKeyword={setStoreSearchKeyword}
        setPromotion={setPromotion}
        dataSource={dataSource}
        isLoading={isLoading}
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
