import Images01 from "../../public/assets/images/images-1.jpg";
import Images02 from "../../public/assets/images/images-2.jpg";
import Images03 from "../../public/assets/images/images-3.jpg";
import Images04 from "../../public/assets/images/images-4.jpg";
import Images05 from "../../public/assets/images/images-5.jpg";
import Images06 from "../../public/assets/images/images-6.jpg";
import Images07 from "../../public/assets/images/images-7.jpg";
import Images08 from "../../public/assets/images/images-8.jpg";

import Bar from "../../public/assets/images/img-bar.png";
import Car from "../../public/assets/images/img-car.png";
import Casino from "../../public/assets/images/img-casino.png";
import Club from "../../public/assets/images/img-club.png";
import Golf from "../../public/assets/images/img-golf.png";
import Jtv from "../../public/assets/images/img-jtv.png";
import Ktv from "../../public/assets/images/img-ktv.png";
import Massage from "../../public/assets/images/img-massage.png";
import Money from "../../public/assets/images/img-money.png";
import Restaurant from "../../public/assets/images/img-restaurant.png";
import Travel from "../../public/assets/images/img-travel.png";
import Villa from "../../public/assets/images/img-villa.png";
import Hotel from "../../public/assets/images/img-hotel.png";

import SampleDetail01 from "../../public/assets/images/sample_detail01.jpeg";
import SampleDetail02 from "../../public/assets/images/sample_detail02.jpeg";
import SampleDetail03 from "../../public/assets/images/sample_detail03.jpeg";

const SampleDetail = [
  {
    id: 1,
    images: [
      {
        id: 1,
        url: SampleDetail01,
      },
      {
        id: 2,
        url: SampleDetail02,
      },
      {
        id: 3,
        url: SampleDetail03,
      },
    ],
  },
];

const Menu = [
  { id: 1, name: "전체" },
  {
    id: 2,
    name: "KTV",
  },
  {
    id: 3,
    name: "JTV",
  },
  {
    id: 4,
    name: "BAR",
  },
  {
    id: 5,
    name: "마사지",
  },
  {
    id: 6,
    name: "클럽/나이트",
  },
  {
    id: 7,
    name: "호텔",
  },
  {
    id: 8,
    name: "풀빌라",
  },
  {
    id: 9,
    name: "카지노",
  },
  {
    id: 10,
    name: "골프CC",
  },
  {
    id: 11,
    name: "음식점",
  },
  {
    id: 12,
    name: "렌터카",
  },
  {
    id: 13,
    name: "여행사",
  },
  {
    id: 14,
    name: "환전",
  },
  {
    id: 15,
    name: "기타",
  },
];

const Category = {
  "1220cfe0-c153-11ed-8fb3-59762efda8c3": Hotel,
  "15c65840-c153-11ed-8fb3-59762efda8c3": Car,
  "d280e860-c202-11ed-9d04-9f79e1e743ff": Bar,
  "e0a61fa0-c202-11ed-9d04-9f79e1e743ff": Casino,
  "d90797b0-c202-11ed-9d04-9f79e1e743ff": Club,
  "e4006e30-c202-11ed-9d04-9f79e1e743ff": Golf,
  "cc510ba0-c202-11ed-9d04-9f79e1e743ff": Jtv,
  "fded4da0-c152-11ed-8fb3-59762efda8c3": Ktv,
  "d534e4d0-c202-11ed-9d04-9f79e1e743ff": Massage,
  "f5937c00-c202-11ed-9d04-9f79e1e743ff": Money,
  "ea0ee040-c202-11ed-9d04-9f79e1e743ff": Restaurant,
  "f14f69b0-c202-11ed-9d04-9f79e1e743ff": Travel,
  "ddb9d520-c202-11ed-9d04-9f79e1e743ff": Villa,
};

const Images = [
  { id: 1, url: Images01 },
  { id: 2, url: Images02 },
  { id: 3, url: Images03 },
  { id: 4, url: Images04 },
  { id: 5, url: Images05 },
  { id: 6, url: Images06 },
  { id: 7, url: Images07 },
  { id: 8, url: Images08 },
];

const Post = [
  {
    id: 1,
    images: [
      {
        id: 1,
        url: Images01,
      },
      {
        id: 2,
        url: Images02,
      },
      {
        id: 3,
        url: Images03,
      },
      {
        id: 4,
        url: Images04,
      },
      {
        id: 5,
        url: Images05,
      },
    ],
    storeName: "업체명",
    category: "업종 카테고리",
    address: "CCP Complex, Roxas Blvd, Pasay, 1300 Metro Manila, 필리핀",
    phone: "+63-2-8573-5555",
    content: "요금 및 메뉴 안내 텍스트 또는 이미지를 보여 줍니다.",
    ownerName: "홍길동",
    remark: "",
    registerDate: "2023-03-02",
    expiredDate: "",
    post: true,
    promotion: true,
    region: "앙헬레스",
    lat: "",
    lng: "",
  },
  {
    id: 2,
    images: [
      {
        id: 1,
        url: Images02,
      },
      {
        id: 2,
        url: Images02,
      },
      {
        id: 3,
        url: Images03,
      },
      {
        id: 4,
        url: Images04,
      },
      {
        id: 5,
        url: Images05,
      },
    ],
    storeName: "업체명",
    category: "업종 카테고리",
    address: "CCP Complex, Roxas Blvd, Pasay, 1300 Metro Manila, 필리핀",
    phone: "+63-2-8573-5555",
    content: "요금 및 메뉴 안내 텍스트 또는 이미지를 보여 줍니다.",
    ownerName: "홍길동",
    remark: "",
    registerDate: "2023-03-02",
    expiredDate: "",
    post: true,
    promotion: true,
    region: "앙헬레스",
    lat: "",
    lng: "",
  },
  {
    id: 3,
    images: [
      {
        id: 1,
        url: Images03,
      },
      {
        id: 2,
        url: Images02,
      },
      {
        id: 3,
        url: Images03,
      },
      {
        id: 4,
        url: Images04,
      },
      {
        id: 5,
        url: Images05,
      },
    ],
    storeName: "업체명",
    category: "업종 카테고리",
    address: "CCP Complex, Roxas Blvd, Pasay, 1300 Metro Manila, 필리핀",
    phone: "+63-2-8573-5555",
    content: "요금 및 메뉴 안내 텍스트 또는 이미지를 보여 줍니다.",
    ownerName: "홍길동",
    remark: "",
    registerDate: "2023-03-02",
    expiredDate: "",
    post: true,
    promotion: true,
    region: "앙헬레스",
    lat: "",
    lng: "",
  },
  {
    id: 4,
    images: [
      {
        id: 1,
        url: Images04,
      },
      {
        id: 2,
        url: Images02,
      },
      {
        id: 3,
        url: Images03,
      },
      {
        id: 4,
        url: Images04,
      },
      {
        id: 5,
        url: Images05,
      },
    ],
    storeName: "업체명",
    category: "업종 카테고리",
    address: "CCP Complex, Roxas Blvd, Pasay, 1300 Metro Manila, 필리핀",
    phone: "+63-2-8573-5555",
    content: "요금 및 메뉴 안내 텍스트 또는 이미지를 보여 줍니다.",
    ownerName: "홍길동",
    remark: "",
    registerDate: "2023-03-02",
    expiredDate: "",
    post: true,
    promotion: true,
    region: "앙헬레스",
    lat: "",
    lng: "",
  },
  {
    id: 5,
    images: [
      {
        id: 1,
        url: Images05,
      },
      {
        id: 2,
        url: Images02,
      },
      {
        id: 3,
        url: Images03,
      },
      {
        id: 4,
        url: Images04,
      },
      {
        id: 5,
        url: Images05,
      },
    ],
    storeName: "업체명",
    category: "업종 카테고리",
    address: "CCP Complex, Roxas Blvd, Pasay, 1300 Metro Manila, 필리핀",
    phone: "+63-2-8573-5555",
    content: "요금 및 메뉴 안내 텍스트 또는 이미지를 보여 줍니다.",
    ownerName: "홍길동",
    remark: "",
    registerDate: "2023-03-02",
    expiredDate: "",
    post: true,
    promotion: true,
    region: "앙헬레스",
    lat: "",
    lng: "",
  },
  {
    id: 6,
    images: [
      {
        id: 1,
        url: Images06,
      },
      {
        id: 2,
        url: Images02,
      },
      {
        id: 3,
        url: Images03,
      },
      {
        id: 4,
        url: Images04,
      },
      {
        id: 5,
        url: Images05,
      },
    ],
    storeName: "업체명",
    category: "업종 카테고리",
    address: "CCP Complex, Roxas Blvd, Pasay, 1300 Metro Manila, 필리핀",
    phone: "+63-2-8573-5555",
    content: "요금 및 메뉴 안내 텍스트 또는 이미지를 보여 줍니다.",
    ownerName: "홍길동",
    remark: "",
    registerDate: "2023-03-02",
    expiredDate: "",
    post: true,
    promotion: true,
    region: "앙헬레스",
    lat: "",
    lng: "",
  },
  {
    id: 7,
    images: [
      {
        id: 1,
        url: Images07,
      },
      {
        id: 2,
        url: Images02,
      },
      {
        id: 3,
        url: Images03,
      },
      {
        id: 4,
        url: Images04,
      },
      {
        id: 5,
        url: Images05,
      },
    ],
    storeName: "업체명",
    category: "업종 카테고리",
    address: "CCP Complex, Roxas Blvd, Pasay, 1300 Metro Manila, 필리핀",
    phone: "+63-2-8573-5555",
    content: "요금 및 메뉴 안내 텍스트 또는 이미지를 보여 줍니다.",
    ownerName: "홍길동",
    remark: "",
    registerDate: "2023-03-02",
    expiredDate: "",
    post: true,
    promotion: true,
    region: "앙헬레스",
    lat: "",
    lng: "",
  },
  {
    id: 8,
    images: [
      {
        id: 1,
        url: Images08,
      },
      {
        id: 2,
        url: Images02,
      },
      {
        id: 3,
        url: Images03,
      },
      {
        id: 4,
        url: Images04,
      },
      {
        id: 5,
        url: Images05,
      },
    ],
    storeName: "업체명",
    category: "업종 카테고리",
    address: "CCP Complex, Roxas Blvd, Pasay, 1300 Metro Manila, 필리핀",
    phone: "+63-2-8573-5555",
    content: "요금 및 메뉴 안내 텍스트 또는 이미지를 보여 줍니다.",
    ownerName: "홍길동",
    remark: "",
    registerDate: "2023-03-02",
    expiredDate: "",
    post: true,
    promotion: true,
    region: "앙헬레스",
    lat: "",
    lng: "",
  },
  {
    id: 9,
    images: [
      {
        id: 1,
        url: Images01,
      },
    ],
    storeName: "업체명",
    category: "업종 카테고리",
    address: "CCP Complex, Roxas Blvd, Pasay, 1300 Metro Manila, 필리핀",
    phone: "+63-2-8573-5555",
    content: "요금 및 메뉴 안내 텍스트 또는 이미지를 보여 줍니다.",
    ownerName: "홍길동",
    remark: "",
    registerDate: "2023-03-02",
    expiredDate: "",
    post: true,
    promotion: true,
    region: "앙헬레스",
    lat: "",
    lng: "",
  },
  {
    id: 10,
    images: [
      {
        id: 1,
        url: Images02,
      },
    ],
    storeName: "업체명",
    category: "업종 카테고리",
    address: "CCP Complex, Roxas Blvd, Pasay, 1300 Metro Manila, 필리핀",
    phone: "+63-2-8573-5555",
    content: "요금 및 메뉴 안내 텍스트 또는 이미지를 보여 줍니다.",
    ownerName: "홍길동",
    remark: "",
    registerDate: "2023-03-02",
    expiredDate: "",
    post: true,
    promotion: true,
    region: "앙헬레스",
    lat: "",
    lng: "",
  },
  {
    id: 11,
    images: [
      {
        id: 1,
        url: Images03,
      },
    ],
    storeName: "업체명",
    category: "업종 카테고리",
    address: "CCP Complex, Roxas Blvd, Pasay, 1300 Metro Manila, 필리핀",
    phone: "+63-2-8573-5555",
    content: "요금 및 메뉴 안내 텍스트 또는 이미지를 보여 줍니다.",
    ownerName: "홍길동",
    remark: "",
    registerDate: "2023-03-02",
    expiredDate: "",
    post: true,
    promotion: true,
    region: "앙헬레스",
    lat: "",
    lng: "",
  },
  {
    id: 12,
    images: [
      {
        id: 1,
        url: Images04,
      },
    ],
    storeName: "업체명",
    category: "업종 카테고리",
    address: "CCP Complex, Roxas Blvd, Pasay, 1300 Metro Manila, 필리핀",
    phone: "+63-2-8573-5555",
    content: "요금 및 메뉴 안내 텍스트 또는 이미지를 보여 줍니다.",
    ownerName: "홍길동",
    remark: "",
    registerDate: "2023-03-02",
    expiredDate: "",
    post: true,
    promotion: true,
    region: "앙헬레스",
    lat: "",
    lng: "",
  },
  {
    id: 13,
    images: [
      {
        id: 1,
        url: Images05,
      },
    ],
    storeName: "업체명",
    category: "업종 카테고리",
    address: "CCP Complex, Roxas Blvd, Pasay, 1300 Metro Manila, 필리핀",
    phone: "+63-2-8573-5555",
    content: "요금 및 메뉴 안내 텍스트 또는 이미지를 보여 줍니다.",
    ownerName: "홍길동",
    remark: "",
    registerDate: "2023-03-02",
    expiredDate: "",
    post: true,
    promotion: true,
    region: "앙헬레스",
    lat: "",
    lng: "",
  },
  {
    id: 14,
    images: [
      {
        id: 1,
        url: Images06,
      },
    ],
    storeName: "업체명",
    category: "업종 카테고리",
    address: "CCP Complex, Roxas Blvd, Pasay, 1300 Metro Manila, 필리핀",
    phone: "+63-2-8573-5555",
    content: "요금 및 메뉴 안내 텍스트 또는 이미지를 보여 줍니다.",
    ownerName: "홍길동",
    remark: "",
    registerDate: "2023-03-02",
    expiredDate: "",
    post: true,
    promotion: true,
    region: "앙헬레스",
    lat: "",
    lng: "",
  },
  {
    id: 15,
    images: [
      {
        id: 1,
        url: Images07,
      },
    ],
    storeName: "업체명",
    category: "업종 카테고리",
    address: "CCP Complex, Roxas Blvd, Pasay, 1300 Metro Manila, 필리핀",
    phone: "+63-2-8573-5555",
    content: "요금 및 메뉴 안내 텍스트 또는 이미지를 보여 줍니다.",
    ownerName: "홍길동",
    remark: "",
    registerDate: "2023-03-02",
    expiredDate: "",
    post: true,
    promotion: true,
    region: "앙헬레스",
    lat: "",
    lng: "",
  },
  {
    id: 16,
    images: [
      {
        id: 1,
        url: Images08,
      },
    ],
    storeName: "업체명",
    category: "업종 카테고리",
    address: "CCP Complex, Roxas Blvd, Pasay, 1300 Metro Manila, 필리핀",
    phone: "+63-2-8573-5555",
    content: "요금 및 메뉴 안내 텍스트 또는 이미지를 보여 줍니다.",
    ownerName: "홍길동",
    remark: "",
    registerDate: "2023-03-02",
    expiredDate: "",
    post: true,
    promotion: true,
    region: "앙헬레스",
    lat: "",
    lng: "",
  },
  {
    id: 17,
    images: [
      {
        id: 1,
        url: Images01,
      },
    ],
    storeName: "업체명",
    category: "업종 카테고리",
    address: "CCP Complex, Roxas Blvd, Pasay, 1300 Metro Manila, 필리핀",
    phone: "+63-2-8573-5555",
    content: "요금 및 메뉴 안내 텍스트 또는 이미지를 보여 줍니다.",
    ownerName: "홍길동",
    remark: "",
    registerDate: "2023-03-02",
    expiredDate: "",
    post: true,
    promotion: true,
    region: "앙헬레스",
    lat: "",
    lng: "",
  },
  {
    id: 18,
    images: [
      {
        id: 1,
        url: Images02,
      },
    ],
    storeName: "업체명",
    category: "업종 카테고리",
    address: "CCP Complex, Roxas Blvd, Pasay, 1300 Metro Manila, 필리핀",
    phone: "+63-2-8573-5555",
    content: "요금 및 메뉴 안내 텍스트 또는 이미지를 보여 줍니다.",
    ownerName: "홍길동",
    remark: "",
    registerDate: "2023-03-02",
    expiredDate: "",
    post: true,
    promotion: true,
    region: "앙헬레스",
    lat: "",
    lng: "",
  },
  {
    id: 19,
    images: [
      {
        id: 1,
        url: Images03,
      },
    ],
    storeName: "업체명",
    category: "업종 카테고리",
    address: "CCP Complex, Roxas Blvd, Pasay, 1300 Metro Manila, 필리핀",
    phone: "+63-2-8573-5555",
    content: "요금 및 메뉴 안내 텍스트 또는 이미지를 보여 줍니다.",
    ownerName: "홍길동",
    remark: "",
    registerDate: "2023-03-02",
    expiredDate: "",
    post: true,
    promotion: true,
    region: "앙헬레스",
    lat: "",
    lng: "",
  },
  {
    id: 20,
    images: [
      {
        id: 1,
        url: Images04,
      },
    ],
    storeName: "업체명",
    category: "업종 카테고리",
    address: "CCP Complex, Roxas Blvd, Pasay, 1300 Metro Manila, 필리핀",
    phone: "+63-2-8573-5555",
    content: "요금 및 메뉴 안내 텍스트 또는 이미지를 보여 줍니다.",
    ownerName: "홍길동",
    remark: "",
    registerDate: "2023-03-02",
    expiredDate: "",
    post: true,
    promotion: true,
    region: "앙헬레스",
    lat: "",
    lng: "",
  },
  {
    id: 21,
    images: [
      {
        id: 1,
        url: Images05,
      },
    ],
    storeName: "업체명",
    category: "업종 카테고리",
    address: "CCP Complex, Roxas Blvd, Pasay, 1300 Metro Manila, 필리핀",
    phone: "+63-2-8573-5555",
    content: "요금 및 메뉴 안내 텍스트 또는 이미지를 보여 줍니다.",
    ownerName: "홍길동",
    remark: "",
    registerDate: "2023-03-02",
    expiredDate: "",
    post: true,
    promotion: true,
    region: "앙헬레스",
    lat: "",
    lng: "",
  },
  {
    id: 22,
    images: [
      {
        id: 1,
        url: Images06,
      },
    ],
    storeName: "업체명",
    category: "업종 카테고리",
    address: "CCP Complex, Roxas Blvd, Pasay, 1300 Metro Manila, 필리핀",
    phone: "+63-2-8573-5555",
    content: "요금 및 메뉴 안내 텍스트 또는 이미지를 보여 줍니다.",
    ownerName: "홍길동",
    remark: "",
    registerDate: "2023-03-02",
    expiredDate: "",
    post: true,
    promotion: true,
    region: "앙헬레스",
    lat: "",
    lng: "",
  },
  {
    id: 23,
    images: [
      {
        id: 1,
        url: Images07,
      },
    ],
    storeName: "업체명",
    category: "업종 카테고리",
    address: "CCP Complex, Roxas Blvd, Pasay, 1300 Metro Manila, 필리핀",
    phone: "+63-2-8573-5555",
    content: "요금 및 메뉴 안내 텍스트 또는 이미지를 보여 줍니다.",
    ownerName: "홍길동",
    remark: "",
    registerDate: "2023-03-02",
    expiredDate: "",
    post: true,
    promotion: true,
    region: "앙헬레스",
    lat: "",
    lng: "",
  },
  {
    id: 24,
    images: [
      {
        id: 1,
        url: Images08,
      },
    ],
    storeName: "업체명",
    category: "업종 카테고리",
    address: "CCP Complex, Roxas Blvd, Pasay, 1300 Metro Manila, 필리핀",
    phone: "+63-2-8573-5555",
    content: "요금 및 메뉴 안내 텍스트 또는 이미지를 보여 줍니다.",
    ownerName: "홍길동",
    remark: "",
    registerDate: "2023-03-02",
    expiredDate: "",
    post: true,
    promotion: true,
    region: "앙헬레스",
    lat: "",
    lng: "",
  },
  {
    id: 25,
    images: [
      {
        id: 1,
        url: Images01,
      },
    ],
    storeName: "업체명",
    category: "업종 카테고리",
    address: "CCP Complex, Roxas Blvd, Pasay, 1300 Metro Manila, 필리핀",
    phone: "+63-2-8573-5555",
    content: "요금 및 메뉴 안내 텍스트 또는 이미지를 보여 줍니다.",
    ownerName: "홍길동",
    remark: "",
    registerDate: "2023-03-02",
    expiredDate: "",
    post: true,
    promotion: true,
    region: "앙헬레스",
    lat: "",
    lng: "",
  },
];

export default { Menu, Post, Images, Category, SampleDetail };
