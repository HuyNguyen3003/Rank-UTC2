const filterSubject = (array) => {
  return array.filter(
    (obj) =>
      !(
        obj.monHoc.includes("Giáo dục thể chất") ||
        obj.monHoc.includes("Giáo dục QP-AN") ||
        ["Tiếng Anh A1", "Tiếng Anh A2"].includes(obj.monHoc)
      )
  );
};

const getCoefficientFour = (coefficientTen, credits) => {
  if (coefficientTen >= 0 && coefficientTen < 2) return credits * 0;
  if (coefficientTen >= 2 && coefficientTen < 4) return credits * 0.5;
  if (coefficientTen >= 4 && coefficientTen < 4.5) return credits * 1;
  if (coefficientTen >= 4.5 && coefficientTen < 5.5) return credits * 1.5;
  if (coefficientTen >= 5.5 && coefficientTen < 6) return credits * 2;
  if (coefficientTen >= 6 && coefficientTen < 7) return credits * 2.5;
  if (coefficientTen >= 7 && coefficientTen < 8) return credits * 3;
  if (coefficientTen >= 8 && coefficientTen < 8.5) return credits * 3.5;
  if (coefficientTen >= 8.5 && coefficientTen < 9.5) return credits * 3.8;
  if (coefficientTen >= 9.5 && coefficientTen < 10) return credits * 4;
};

const resolveData = (data) => {
  let result = [];

  // group by hocKy
  const groupedObjects = data.reduce((result, obj) => {
    const { hocKy } = obj;
    if (!result[hocKy]) result[hocKy] = [];
    result[hocKy].push(obj);
    return result;
  }, {});

  // calc accumulated score & push to result
  for (const key in groupedObjects) {
    if (!Object.hasOwnProperty.call(groupedObjects, key)) continue;

    const scholasticAndSemester = key.split("_");
    const semester = scholasticAndSemester.pop();
    const scholastic = scholasticAndSemester.join("-");

    const res = filterSubject(groupedObjects[key]).reduce(
      (result, obj) => {
        result.toltalTC += obj.soTinChi;
        result.totalDiem += obj.soTinChi * obj.diem;
        result.totalDiem4 += getCoefficientFour(obj.diem, obj.soTinChi);
        return result;
      },
      {
        toltalTC: 0,
        totalDiem: 0,
        totalDiem4: 0,
      }
    );

    const coefficientTen = parseFloat(
      (res.totalDiem / res.toltalTC).toFixed(2)
    );
    const coefficientFour = parseFloat(
      (res.totalDiem4 / res.toltalTC).toFixed(2)
    );

    result.push({
      semester,
      scholastic,
      coefficientTen,
      coefficientFour,
    });
  }

  return result;
};
module.exports = { resolveData };
