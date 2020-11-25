// 防抖
export function debounce (fn, delay = 500) {
    let timer = null;
    return function () {
        if (timer) {
            clearTimeout(timer);
        }
        timer = setTimeout(() => {
            fn.apply(this, arguments);
        }, delay);
    }
}

// 节流
export function throttle (fn, delay = 1000) {
    let valid = true;
    return function () {
        if (!valid) {
            return false;
        }
        valid = false;
        setTimeout(() => {
            fn.apply(this, arguments);
            valid = true;
        }, delay);
    }
}