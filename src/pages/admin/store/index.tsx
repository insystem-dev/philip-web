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
        goEdit={goEdit}
      />
    </>
  );
};

export default AdminStore;
