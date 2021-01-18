// 防抖
export function debounce(fn, delay = 500) {
    let timer = null;
    return function (args) {
        if (timer) {
            clearTimeout(timer);
        }
        timer = setTimeout(() => {
            fn.apply(this, ...args);
        }, delay);
    };
}

// 节流
export function throttle(fn, delay = 1000) {
    let valid = true;
    return function (args) {
        if (!valid) {
            return;
        }
        valid = false;
        setTimeout(() => {
            fn.apply(this, ...args);
            valid = true;
        }, delay);
    };
}
