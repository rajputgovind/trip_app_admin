export default function commonFunction(data) {
  if (data) {
    const data1 = data.toString();
    const data2 = new Date(data);
    const dataFound = data2.toString().split(" ");
    let formatDate = `${dataFound[2]}-${dataFound[1]}-${dataFound[3]}`;

    return formatDate;
  }
}
