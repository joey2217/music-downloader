import { fetchMusic, fetchSearch } from "@/lib/api";
import type { SearchItem } from "@/types";
import { Suspense } from "react";
import { Await, Form, LoaderFunction, useLoaderData } from "react-router";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";

export const homeLoader: LoaderFunction = async ({ request }) => {
  const url = new URL(request.url);
  const keyword = url.searchParams.get("keyword") || "";
  const searchPromise = keyword ? fetchSearch(keyword) : Promise.resolve([]);
  return {
    searchPromise,
    keyword,
  };
};

interface LoaderData {
  searchPromise: Promise<SearchItem[]>;
  keyword: string;
}

interface Props {
  searchItems: SearchItem[];
}

function SearchTable({ searchItems }: Props) {
  const download = async (searchItem: SearchItem) => {
    const music = await fetchMusic(searchItem.url_id);
  };
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>name</TableHead>
          <TableHead>artist</TableHead>
          <TableHead>album</TableHead>
          <TableHead>action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {searchItems.map((item) => (
          <TableRow key={item.id}>
            <TableCell>{item.name}</TableCell>
            <TableCell>{item.artist.join()}</TableCell>
            <TableCell>{item.album}</TableCell>
            <TableCell>
              <button onClick={() => download(item)}>下载</button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

export default function Home() {
  const { searchPromise, keyword } = useLoaderData<LoaderData>();
  return (
    <div className="container">
      <Form>
        <Input name="keyword" defaultValue={keyword} />
      </Form>
      <Suspense fallback={<div>loading</div>}>
        <Await resolve={searchPromise}>{(searchItems) => <SearchTable searchItems={searchItems} />}</Await>
      </Suspense>
    </div>
  );
}
