export const useNumber = async (signal?: AbortSignal) => {

    const response = await fetch("/proxyApi/test/getNumber", {
        signal,
    });
    if (!response.ok) {
        throw new Error("Network response was not ok");
    }
    const data = await response.json();
    return data.number
};
