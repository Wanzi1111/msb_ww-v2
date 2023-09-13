import { listNonSystemcodeAPI } from "@/api/group/annualInformation";

// select 输入搜索 单位
export function remoteMethod(query, dom) {
  console.log(query, "query");
  console.log(this, "this");
  console.log(dom, "dom");
  if (query !== "") {
    listNonSystemcodeAPI({ unitName: query }).then((res) => {
      const data = (res.rows || []).map((i) => ({
        label: i.unitName,
        // value: i.id,
        value: { label: i.unitName, value: i.id },
      }));
      setForm.call(this, "options", "companyId", data, dom);
    });
  } else {
    setForm.call(this, "options", "type", [], dom);
  }
}

// set form
export function setForm(type, key, data = [], dom) {
  console.log(dom, "dom");
  this?.$refs[dom] &&
    this?.$refs[dom].set({
      type,
      data: { [key]: data },
    });
}
