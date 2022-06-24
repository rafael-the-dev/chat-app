
export const isValidElement = (element) => {
    return (Boolean(element) && Boolean(element.current));
}

export const openAlert = element => () => {
    if(isValidElement(element)) {
        element.current.classList.add("h-auto", "mb-2");
        element.current.classList.remove("h-0", "hidden", "opacity-0", "mb-0")
    }
}

export const closeAlert = element => () => {
    if(isValidElement(element)) {
        element.current.classList.remove("h-auto", "mb-2", "mb-3")
        element.current.classList.add("h-0", "hidden", "opacity-0")
    }
}