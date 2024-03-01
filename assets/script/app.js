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


// Checking Operating System
function checkOS() {
    return window.navigator.userAgent.indexOf("Windows") !== -1 ? "Windows" :
           window.navigator.userAgent.indexOf("Mac OS") !== -1 ? "Mac OS" :
           window.navigator.userAgent.indexOf("Linux") !== -1 ? "Linux" :
           "Null";
}

// Checking language used
function checkLanguage() {
    return navigator.language;
}

// Checking Browser name
function checkBrowser() {
    return window.navigator.userAgent.indexOf("Edg") !== -1 ? "Microsoft Edge" :
           window.navigator.userAgent.indexOf("OPR") !== -1 ? "Opera" :
           window.navigator.userAgent.indexOf("Chrome") !== -1 ? "Chrome" :
           window.navigator.userAgent.indexOf("Firefox") !== -1 ? "Firefox" :
           window.navigator.userAgent.indexOf("Safari") !== -1 ? "Safari" :
           (window.navigator.userAgent.indexOf("MSIE") !== -1 || window.navigator.userAgent.indexOf("rv:") !== -1) ? "Internet Explorer" :
           "Null";
}

// Getting the dimensions of screen
function checkWindowWidth() {
    return window.innerWidth;
}

function checkWindowHeight() {
    return window.innerHeight;
}

// Checking orientation
function checkOrientation() {
    return innerWidth > innerHeight ? 'Landscape' : 'Portrait';
}

// Fetching details about the battery level and its status
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


// Checking connectivity
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