import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useDownloadStore } from "@/store/download";
import { useSettingStore } from "@/store/setting";

export default function Download() {
  const list = useDownloadStore((s) => s.items);
  const remove = useDownloadStore((s) => s.remove);
  const downloadDir = useSettingStore((s) => s.downloadDir);
  return (
    <div>
      <div className="flex my-2">
        <div className="self-center">下载目录 :&nbsp;</div>
        <div className="border rounded-md rounded-r-none leading-9 flex-1 truncate px-2">{downloadDir}</div>
        <Button className="rounded-l-none" onClick={() => window.mainAPI.openPath(downloadDir)}>
          打开
        </Button>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>歌名</TableHead>
            <TableHead>歌手</TableHead>
            <TableHead>专辑</TableHead>
            <TableHead>状态</TableHead>
            <TableHead>操作</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {list.map((item, i) => (
            <TableRow key={item.id}>
              <TableCell>{item.title}</TableCell>
              <TableCell>{item.artist}</TableCell>
              <TableCell className="max-w-24 truncate" title={item.album}>
                {item.album}
              </TableCell>
              <TableCell>{item.status}</TableCell>
              <TableCell className="space-x-1">
                <button onClick={() => remove(i)}>删除</button>
                <button onClick={() => window.mainAPI.showItemInFolder(item.downloadPath)}>打开</button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
