export const useFetchPieData = async () => {
    let res = await fetch("/proxyApi/test/getPieData");
    let data = await res.json();
    return data.data;
};
