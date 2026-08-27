import useWindowWidth from "@/lib/hooks/useWindowWidth";
import { InputText } from "@/components/atoms/Input/InputText";
import { InputSelect } from "@/components/atoms/Input/InputSelect";
import { InputCheckbox } from "@/components/atoms/Input/InputCheckbox";
import { Button } from "@/components/atoms/Button";
import * as S from "./searchBox.style";
import React, { useEffect, useState } from "react";
import { usePhilipLocale } from "@/i18n/usePhilipLocale";

interface SearchBox {
  cityOptions: any[];
  getCityOption: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  city: any;
  categoryOptions: any[];
  getCategoryOption: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  category: any;
  getValue: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const SearchBox = ({
  cityOptions,
  getCityOption,
  city,
  categoryOptions,
  getCategoryOption,
  category,
  getValue,
}: SearchBox) => {
  const isWindowWidth = useWindowWidth();
  const { message } = usePhilipLocale();

  return (
    <S.SearchBox>
      {/* 검색은 onChange로 동작하므로 submit 시 페이지 리로드만 방지 */}
      <S.SearchForm id="searchForm" onSubmit={(e: any) => e.preventDefault()}>
        {isWindowWidth < 769 && (
          <S.SearchMobileInput>
            <InputSelect
              layout="row"
              size="xlg"
              width="calc(50vw - 20px)"
              options={cityOptions}
              onChange={getCityOption}
              value={city}
            />
            <InputSelect
              layout="row"
              size="xlg"
              width="calc(50vw - 20px)"
              options={categoryOptions}
              onChange={getCategoryOption}
              value={category}
            />
          </S.SearchMobileInput>
        )}
        <InputText
          label={isWindowWidth < 769 ? "" : message.main.searchLabel}
          layout={isWindowWidth < 769 ? "row" : "column"}
          size={isWindowWidth < 769 ? "xlg" : "md"}
          width="100%"
          placeholder={
            isWindowWidth < 769
              ? message.main.searchPlaceholder
              : message.main.inputPlaceholder
          }
          onChange={getValue}
        />
        {/* <InputText
          label="기타 검색"
          layout="column"
          size="md"
          width="100%"
        />
        <InputCheckbox value="1" layout="row" displayValue="기타 검색옵션" />
        <InputCheckbox value="2" layout="row" displayValue="기타 검색옵션" /> */}
      </S.SearchForm>
      {isWindowWidth >= 769 && (
        <Button
          type="button"
          form="searchForm"
          width="100%"
          height={40}
          color="search"
          layout="solid"
          label={message.main.search}
        />
      )}
    </S.SearchBox>
  );
};
