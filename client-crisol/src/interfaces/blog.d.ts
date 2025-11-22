export interface IBlogResponse {
  valid: string;
  results: number;
  blog: Iblogs;
}

export interface IBlogsResponse {
  valid: string;
  results: number;
  blogs: Iblogs[];
}

export interface IBlog {
  id: string;
}

export interface Iblogs {
  _id: string;
  author: string;
  title: string;
  subTitle: string;
  description: string;
  category: string;
  image: File;
  isPublished: boolean;
  createdAt: string;
  updatedAt: string;
}
export interface IDashboardResponse {
  Blogs: IDashboard
}

export interface IDashboard {
  blogs: number;
  comments: number;
  drafts: number;
  recentblogs: Iblogs[];
}

interface IBlogTableItemProps {
  blog: Iblogs;
  index: number;
}

interface IResponse {
  message: string;
  valid: string;
  content: string;
}