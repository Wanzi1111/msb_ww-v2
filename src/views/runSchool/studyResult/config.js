export const statusList = [
    { label: "未提交", value: 0 },
    { label: "已提交", value: 1 },
    { label: "已通过", value: 2 },
    { label: "未通过", value: 3 },
  ];
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