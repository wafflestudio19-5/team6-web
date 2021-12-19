import { BaseEditor, Descendant } from "slate";
import { ReactEditor } from "slate-react";
import { HistoryEditor } from "slate-history";

type CustomElement = { type: "paragraph"; children: CustomText[] };
type CustomText = { text: string; bold?: true };

declare module "slate" {
  interface CustomTypes {
    Editor: BaseEditor & ReactEditor & HistoryEditor;
    Element: CustomElement;
    Text: CustomText;
  }
}
type userData = {
  id: number;
  name: string;
  profile_img: string;
  region: string;
  title: string;
  product_img: string[];
  article: Descendant[];
  price: number;
  time: string;
  temperature: number;
  category: string;
  chat: number;
  interest: number;
  hit: number;
};

const dummyData: userData[] = [
  {
    id: 1,
    name: "김와플",
    region: "관악구 낙성대동",
    profile_img:
      "https://img1.daumcdn.net/thumb/R1280x0.fjpg/?fname=http://t1.daumcdn.net/brunch/service/user/7r5X/image/9djEiPBPMLu_IvCYyvRPwmZkM1g.jpg",
    title: "아이패드",
    product_img: [
      "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/ipad-pro-12-select-wifi-spacegray-202104_FMT_WHH?wid=1945&hei=2000&fmt=jpeg&qlt=95&.v=1617126635000",
      "https://fdn.gsmarena.com/imgroot/news/20/09/new-ipads-announced/-1200/gsmarena_008.jpg",
    ],
    article: [
      { type: "paragraph", children: [{ text: "1억원에 쿨거합니다." }] },
    ],
    price: 100000000,
    time: "11분 전",
    temperature: 36.5,
    category: "디지털기기",
    chat: 0, // 채팅 수
    interest: 1, // 관심 수
    hit: 323, // 조회 수
  },
  {
    id: 2,
    name: "박와플",
    region: "관악구 신림동",
    profile_img:
      "https://i.pinimg.com/474x/83/fc/4c/83fc4c6dca8298dc8e03ba63d35a9cae.jpg",
    title: "에어팟",
    product_img: [
      "https://mblogthumb-phinf.pstatic.net/MjAyMDAyMDNfMTMx/MDAxNTgwNjczNDU1MzEy.63x1XIzrdAUblXW6XCBBtyeD1wG9Ras1F5HiLfuICf0g.ZVJhBIVPu5Og3wzLnQGoTkywGYJMGtTHZ6T6U9776J8g.JPEG.youngwonlee97/KakaoTalk_20200131_033543169.jpg?type=w800",
      "https://www.bigjungbo.com/files/attach/images/163/721/584/007/063b4278c6ddc61a06f8e5bc8bbdc220.jpeg",
      "https://jungocafe.com/data/file/pd_04/832968301_Se3EQtiZ_944e08785e7711a8093b755f38bd65b9996b4c43.jpg",
    ],
    article: [{ type: "paragraph", children: [{ text: "1234" }] }],
    price: 129000,
    time: "3분 전",
    temperature: 36.5,
    category: "디지털기기",
    chat: 8, // 채팅 수
    interest: 17, // 관심 수
    hit: 323, // 조회 수
  },
  {
    id: 3,
    name: "이와플",
    region: "서울대학교",
    profile_img:
      "https://pbs.twimg.com/media/CJdjtiBUMAAWqMk?format=jpg&name=medium",
    title: "아이폰",
    product_img: [
      "https://mblogthumb-phinf.pstatic.net/MjAxODExMDNfMjMw/MDAxNTQxMTg4MjgxMDQw.O-ws_0z_6leEmfuCue9JCYCI__F8VAGVN-KMoKu7Pwwg.khPumH0MHgNphQFMsqU6u6Ju3Z2A_XMKBX7nyLMwzFog.JPEG.overmindx/output_2392083851.jpg?type=w800",
    ],
    article: [{ type: "paragraph", children: [{ text: "231321" }] }],
    price: 100000,
    time: "11분 전",
    temperature: 36.5,
    category: "디지털기기",
    chat: 2, // 채팅 수
    interest: 5, // 관심 수
    hit: 323, // 조회 수
  },
];

export default dummyData;
