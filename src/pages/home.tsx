import { fetchMusicURLData, fetchSearch, PAGE_SZIE } from "@/lib/api";
import type { SearchItem } from "@/types";
import { Suspense } from "react";
import { Await, Form, Link, LoaderFunction, useLoaderData } from "react-router";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { getFileExtension } from "@/lib";
import { useDownloadStore } from "@/store/download";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

export const homeLoader: LoaderFunction = async ({ request }) => {
  const url = new URL(request.url);
  let keyword = url.searchParams.get("keyword");
  if (keyword) {
    sessionStorage.setItem("keyword", keyword);
  } else {
    keyword = sessionStorage.getItem("keyword") || "";
  }
  let page = url.searchParams.get("page");
  if (page) {
    sessionStorage.setItem("page", page);
  } else {
    page = sessionStorage.getItem("page") || "1";
  }
  console.log("searchParams", Object.fromEntries(url.searchParams), { page, keyword });
  const searchPromise = fetchSearch(keyword, page);
  return {
    searchPromise,
    keyword,
    page: Number(page),
  };
};

interface LoaderData {
  searchPromise: Promise<SearchItem[]>;
  keyword: string;
  page: number;
}

interface Props {
  searchItems: SearchItem[];
  page: number;
  keyword: string;
}

function SearchTable({ searchItems, page, keyword }: Props) {
  const download = useDownloadStore((s) => s.download);
  const onDownload = async (searchItem: SearchItem) => {
    const { url, artist: rawArtist, name, id, album, picURL } = await fetchMusicURLData(searchItem);
    const ext = getFileExtension(url);
    const artist = rawArtist.join();
    const fileName = `${artist}-${name}.${ext}`;
    download({
      fileName,
      downloadPath: `D:\\static/${fileName}`,
      id,
      url,
      title: name,
      artist,
      album: album,
      cover: picURL,
      status: "init",
    });
  };
  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>歌名</TableHead>
            <TableHead>歌手</TableHead>
            <TableHead>专辑</TableHead>
            <TableHead>操作</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {searchItems.map((item) => (
            <TableRow key={item.id}>
              <TableCell>{item.name}</TableCell>
              <TableCell>{item.artist.join()}</TableCell>
              <TableCell className="max-w-24 truncate" title={item.album}>
                {item.album}
              </TableCell>
              <TableCell>
                <button onClick={() => onDownload(item)}>下载</button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {searchItems.length > 0 && (
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious disabled={page === 1} to={`/?keyword=${keyword}&page=${page - 1}`} />
            </PaginationItem>
            <PaginationItem>{page}</PaginationItem>
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
            <PaginationItem>
              <PaginationNext disabled={searchItems.length < PAGE_SZIE} to={`/?keyword=${keyword}&page=${page + 1}`} />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}
    </>
  );
}

export default function Home() {
  const { searchPromise, keyword, page } = useLoaderData<LoaderData>();
  return (
    <div className="container">
      <Form
        onSubmit={() => {
          sessionStorage.setItem("page", "1");
        }}
      >
        <Input name="keyword" defaultValue={keyword} placeholder="输入搜索关键词" />
      </Form>
      <Suspense fallback={<div className="text-center">loading</div>}>
        <Await resolve={searchPromise}>
          {(searchItems) => <SearchTable searchItems={searchItems} page={page} keyword={keyword} />}
        </Await>
      </Suspense>
    </div>
  );
}
