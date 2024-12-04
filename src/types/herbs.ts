export interface HerbInfo {
  chinese: string;
  english: string;
  image: string;
}

export const HERB_DATA: Record<string, HerbInfo> = {
  '黄芪': {
    chinese: '黄芪',
    english: 'Astragalus',
    image: '/herbs/huangqi.png'
  },
  '当归': {
    chinese: '当归',
    english: 'Angelica',
    image: '/herbs/danggui.png'
  },
  '人参': {
    chinese: '人参',
    english: 'Ginseng',
    image: '/herbs/renshen.png'
  },
  '枸杞': {
    chinese: '枸杞',
    english: 'Goji Berry',
    image: '/herbs/gouqi.png'
  },
  '灵芝': {
    chinese: '灵芝',
    english: 'Lingzhi',
    image: '/herbs/lingzhi.png'
  }
};