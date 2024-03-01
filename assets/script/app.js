'use strict';

function select(selector, parent = document) {
    return parent.querySelector(selector);
}

function onEvent(event, selector, callback) {
    return selector.addEventListener(event, callback);
}

const screenWidth = select('.width');
const screenHeight = select('.height');
const operatingSystem = select('.os');
const language = select('.language');
const browser = select('.browser');
const screenOrientation = select('.orientation');
const batteryLevel = select('.level');
const batteryStatus = select('.status');
const connectionState = select('.state');
const connectionStateSection = select('.connection-state');


function checkWindowWidth() {
    return window.innerWidth;
}

function checkWindowHeight() {
    return window.innerHeight;
}

function checkOS() {
    if (window.navigator.userAgent.indexOf("Windows") != -1) {
        return "Windows";
    } else if (window.navigator.userAgent.indexOf("Mac OS") != -1) {
        return "Mac OS";
    } else if (window.navigator.userAgent.indexOf("Linux") != -1) {
        return "Linux";
    } else {
        return "Null";
    }
}

function checkLanguage() {
    return navigator.language;
}

function checkBrowser() {
    if (window.navigator.userAgent.indexOf("Edg") != -1) {
        return "Microsoft Edge";
    } else if (window.navigator.userAgent.indexOf("OPR") != -1) {
        return "Opera"; 
    } else if (window.navigator.userAgent.indexOf("Chrome") != -1) {
        return "Chrome"; 
    } else if (window.navigator.userAgent.indexOf("Firefox") != -1) {
        return "Firefox";
    } else if (window.navigator.userAgent.indexOf("Safari") != -1) {
        return "Safari";
    } else if (window.navigator.userAgent.indexOf("MSIE") != -1 ||  window.navigator.userAgent.indexOf("rv:") != -1) {
        return "Internet Explorer";
    } else {
        return "Null";
    }
}

function checkOrientation() {
    return innerWidth > innerHeight ? 'Landscape' : 'Portrait';
}

function batteryState(battery) {
    batteryLevel.innerText = `Level: ${battery.level * 100}%`;
    batteryStatus.innerText = `Status: ${battery.charging ? 'charging' : 'idle'}`;
}

function checkBattery(battery) {
    batteryState(battery);
    
    onEvent('levelchange', battery, () => {
        batteryState(battery);
    });
    
    onEvent('chargingchange', battery, () => {
        batteryState(battery);
    });
}

if ('getBattery' in navigator) {
    navigator.getBattery().then(checkBattery);
} else {
    batteryLevel.innerText = 'Level: not available';
    batteryStatus.innerText = 'Status: not available';
}

const readSystem = () => {
    screenWidth.innerText = `Width: ${checkWindowWidth()}px`;
    screenHeight.innerText = `Height: ${checkWindowHeight()}px`;
    operatingSystem.innerText = `OS: ${checkOS()}`;
    language.innerText = `Language: ${checkLanguage()}`;
    browser.innerText = `Browser: ${checkBrowser()}`;
    screenOrientation.innerText = `Orientation: ${checkOrientation()}`;

    if (navigator.onLine) {
        connectionState.innerText = 'Online';
        connectionStateSection.style.backgroundColor = '#45f8e9';
    } else {
        connectionState.innerText = 'Offline';
        connectionStateSection.style.backgroundColor = '#ff4f4f';
    }
};

window.addEventListener('load', readSystem);
window.addEventListener('resize', readSystem);
window.addEventListener('online', readSystem);
window.addEventListener('offline', readSystem);