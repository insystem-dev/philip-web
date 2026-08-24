import { StoreGrid } from "@/components/molecules/AdminGrid/StoreGrid";
import { StoreSearch } from "@/components/molecules/AdminSearchBox/StoreSearch";

import * as S from "./AdminStoreGrid.style";
import { AdminStorePageProps } from "@/components/templates/AdminStorePage";

export const AdminStoreBox = ({
  setStoreSearchKeyword,
  setPromotion,
  dataSource,
  isLoading,
  page,
  pageSize,
  total,
  totalPages,
  rowNumberOffset,
  onPageChange,
  onPageSizeChange,
  error,
  promotionHandler,
  hiddenHandler,
  orderOptions,
  onChangeOrder,
  sortOptions,
  onChangeSort,
  goEdit,
}: AdminStorePageProps) => {
  return (
    <S.AdminStoreBox>
      <StoreSearch
        setStoreSearchKeyword={setStoreSearchKeyword}
        setPromotion={setPromotion}
      />
      <StoreGrid
        dataSource={dataSource}
        isLoading={isLoading}
        rowNumberOffset={rowNumberOffset}
        error={error}
        promotionHandler={promotionHandler}
        hiddenHandler={hiddenHandler}
        orderOptions={orderOptions}
        onChangeOrder={onChangeOrder}
        sortOptions={sortOptions}
        onChangeSort={onChangeSort}
        goEdit={goEdit}
      />
      <S.Pagination aria-label="업체 목록 페이지 이동">
        <S.PageSummary>
          총 <strong>{total.toLocaleString()}</strong>개
          <span>
            {total === 0 ? 0 : rowNumberOffset + 1}-
            {Math.min(rowNumberOffset + pageSize, total)} 표시
          </span>
        </S.PageSummary>

        <S.PageControls>
          <S.PageButton
            type="button"
            aria-label="첫 페이지"
            disabled={page <= 1}
            onClick={() => onPageChange(1)}
          >
            «
          </S.PageButton>
          <S.PageButton
            type="button"
            aria-label="이전 페이지"
            disabled={page <= 1}
            onClick={() => onPageChange(page - 1)}
          >
            ‹
          </S.PageButton>
          {getVisiblePages(page, totalPages).map((pageNumber) => (
            <S.PageButton
              key={pageNumber}
              type="button"
              $active={pageNumber === page}
              aria-current={pageNumber === page ? "page" : undefined}
              onClick={() => onPageChange(pageNumber)}
            >
              {pageNumber}
            </S.PageButton>
          ))}
          <S.PageButton
            type="button"
            aria-label="다음 페이지"
            disabled={totalPages === 0 || page >= totalPages}
            onClick={() => onPageChange(page + 1)}
          >
            ›
          </S.PageButton>
          <S.PageButton
            type="button"
            aria-label="마지막 페이지"
            disabled={totalPages === 0 || page >= totalPages}
            onClick={() => onPageChange(totalPages)}
          >
            »
          </S.PageButton>
        </S.PageControls>

        <S.PageSizeLabel>
          페이지당
          <select
            aria-label="페이지당 업체 수"
            value={pageSize}
            onChange={(event) => onPageSizeChange(Number(event.target.value))}
          >
            {[10, 20, 50].map((size) => (
              <option key={size} value={size}>
                {size}개
              </option>
            ))}
          </select>
        </S.PageSizeLabel>
      </S.Pagination>
    </S.AdminStoreBox>
  );
};

const getVisiblePages = (page: number, totalPages: number) => {
  if (totalPages <= 0) return [];

  const firstPage = Math.max(1, Math.min(page - 2, totalPages - 4));
  const lastPage = Math.min(totalPages, firstPage + 4);
  return Array.from(
    { length: lastPage - firstPage + 1 },
    (_, index) => firstPage + index
  );
};
