import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useSettingStore } from "@/store/setting";
import React, { PropsWithChildren } from "react";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { BIT_RATE_OPTIONS, SOURCE_OPTIONS } from "@/lib/api";
import ModeToggle from "@/layout/ModeToggle";
import { APP_NAME } from "@/lib/constants";

function Label({ className, ...props }: React.ComponentProps<"label">) {
  return <label {...props} className={`text-sm font-medium leading-none block mb-1.5 ${className ?? ""}`} />;
}

function Row({ className, ...props }: React.ComponentProps<"div">) {
  return <div {...props} className={`${className ?? ""}`} />;
}

function Content({ className, ...props }: React.ComponentProps<"div">) {
  return <div {...props} className={`${className ?? ""}`} />;
}

interface BlockProps {
  id: string;
  title: React.ReactNode;
}

function Block({ id, title, children }: PropsWithChildren<BlockProps>) {
  return (
    <section>
      <h2 id={id}>{title}</h2>
      <div className="space-y-2">{children}</div>
    </section>
  );
}

function DownloadBlock() {
  const downloadDir = useSettingStore((s) => s.downloadDir);
  const br = useSettingStore((s) => s.br);
  const setBr = useSettingStore((s) => s.setBr);
  const setDownloadDir = useSettingStore((s) => s.setDownloadDir);

  const onChangeDownloadDir = () => {
    window.mainAPI
      .selectDirectory()
      .then((path) => {
        setDownloadDir(path);
      })
      .catch(() => {
        // ignore
      });
  };
  return (
    <Block id="download" title="下载">
      <Row>
        <Label>下载目录</Label>
        <Content className="flex">
          <Input className="flex-1 rounded-r-none" disabled value={downloadDir} />
          <Button className="rounded-l-none" onClick={onChangeDownloadDir}>
            更改目录
          </Button>
        </Content>
      </Row>
      <Row>
        <Label>下载音质</Label>
        <Content>
          <Select defaultValue={br} onValueChange={setBr}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="下载音质" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {BIT_RATE_OPTIONS.map((opt) => (
                  <SelectItem key={opt.value} value={opt.value}>
                    {opt.label}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </Content>
      </Row>
    </Block>
  );
}

function AppearanceBlock() {
  return (
    <Block id="appearance" title="外观">
      <Row>
        <Label>主题</Label>
        <Content>
          <ModeToggle />
        </Content>
      </Row>
    </Block>
  );
}

function SourceBlock() {
  const source = useSettingStore((s) => s.source);
  const setSource = useSettingStore((s) => s.setSource);
  return (
    <Block id="source" title="音乐来源">
      <Row>
        <Label>音乐来源</Label>
        <Content>
          <Select defaultValue={source} onValueChange={setSource}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="音乐来源" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {SOURCE_OPTIONS.map((opt) => (
                  <SelectItem key={opt.value} value={opt.value}>
                    {opt.label}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </Content>
      </Row>
    </Block>
  );
}

// type HashNavLinkProps = React.ComponentProps<typeof Link> & {
//   hash: string;
// };

// function HashNavLink({ to, className, hash, ...props }: HashNavLinkProps) {
//   return <Link to={to} className={`nav-link ${hash === to ? "active" : ""}`} {...props} />;
// }

function AboutBlock() {
  return (
    <Block id="about" title="关于">
      <div>
        <h2 className="text-center text-xl font-semibold mt-4">{APP_NAME}</h2>
        <p>API来源 : GD音乐台(music.gdstudio.xyz)</p>
      </div>
    </Block>
  );
}

export default function Setting() {
  // const location = useLocation();

  // useEffect(() => {
  //   console.log(location.hash, "hash");
  //   if (location.hash) {
  //     const element = document.getElementById(location.hash.replace("#", ""));
  //     if (element) {
  //       element.scrollIntoView({ behavior: "smooth" });
  //     }
  //   }
  // }, [location.hash]);

  return (
    <div>
      {/* <nav className="sticky top-[43px] flex items-center gap-2 mb-4">
        <HashNavLink to="#download" hash={location.hash}>
          下载
        </HashNavLink>
        <HashNavLink to="#appearance" hash={location.hash}>
          外观
        </HashNavLink>
      </nav> */}
      <div className="space-y-3">
        <SourceBlock />
        <DownloadBlock />
        <AppearanceBlock />
        <AboutBlock />
      </div>
    </div>
  );
}
