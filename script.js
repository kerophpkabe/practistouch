'use strict'

// ドラッグのための準備
let isDragging = false; // ドラッグ中かどうかを判定
let MstartX, MstartY; // マウスでドラッグ開始時の座標
var startX = null;
var endX = null;
var startY = null;
var endY = null;
var imgTarget = null;
var subkey = 0;

window.addEventListener('load', function () {

    // スワイプ／フリック（ただ座標をとるだけ）
    // document.getElementById("content1").addEventListener('touchmove', logTouch, { passive: false });
    // スワイプ／フリック タッチ開始 タッチ終了
    document.getElementById("content1").addEventListener('touchmove', logSwipe, { passive: false });
    document.getElementById("content1").addEventListener('touchstart', logSwipeStart, { passive: false });
    document.getElementById("content1").addEventListener('touchend', logSwipeEnd);

    // マウスを動かしてるとき（非クリック/ドラッグ）
    // document.getElementById("content1").addEventListener('mousemove', logMouse);
    // クリックしたところだけ
    // document.getElementById("content1").addEventListener('clicl', logMouse);
    // ドラッグした時の対応

    document.getElementById("content1").addEventListener('mousedown', startDrag, { passive: false });
    document.getElementById("content1").addEventListener('mousemove', drag, { passive: false });
    document.getElementById("content1").addEventListener('mouseup', endDrag);
});

const liElements = document.querySelectorAll('#onclick li');

// クリックイベントリスナーを各<li>要素に追加
liElements.forEach((li) => {
    li.addEventListener('mousedown', () => {
        imgTarget = li.firstElementChild.id;
    });
    li.addEventListener('touchmove', () => {
        imgTarget = li.firstElementChild.id;
    }, { passive: false });
});

// スワイプ・フリックのための座標取得サンプル
// function logTouch(event) {
//     console.log("タッチX:" + event.touches[0].pageX);
//     console.log("タッチY:" + event.touches[0].pageY);
// }

// マウスに関するイベント関連
function startDrag(event) {
    event.preventDefault();
    isDragging = true;
    subkey = 1
    MstartX = event.pageX;
    MstartY = event.pageY;
};

function drag(event) {
    event.preventDefault();
    if (subkey === 1) {
        if (isDragging === true) {
            endX = event.pageX;
            endY = event.pageY;
            if (imgTarget !== null) {
                document.getElementById(`${imgTarget}`).style.top = event.pageY - 30 + 'px';
                document.getElementById(`${imgTarget}`).style.left = event.pageX - 30 + 'px';
            }
        }
    }
};

function endDrag(event) {
    event.preventDefault();
    imgTarget = null;
    isDragging = false;
    subkey = 0;
    // if (endX > MstartX) {
    //     console.log(endX + "右向き" + MstartX);
    // } else {
    //     console.log(endX + "左向き" + MstartX);
    // }
    // if (endY > MstartY) {
    //     console.log(endY + "下向き" + MstartY);
    // } else {
    //     console.log(endY + "上向き" + MstartY);
    // }
};




// マウスをドラッグしていないとき・クリックだけは下記を使う
// function logMouse(event) {
//     console.log("マウスX:" + event.pageX);
//     console.log("マウスY:" + event.pageY);
// }

//フリック・スワイプに関するイベント
function logSwipeStart(event) {
    event.preventDefault();
    startX = event.touches[0].pageX;
    event.preventDefault();
    startY = event.touches[0].pageY;
};

function logSwipe(event) {
    event.preventDefault();
    endX = event.touches[0].pageX;
    event.preventDefault();
    endY = event.touches[0].pageY;
    if (imgTarget !== null) {
        document.getElementById(`${imgTarget}`).style.top = event.touches[0].pageY - 30 + 'px';
        document.getElementById(`${imgTarget}`).style.left = event.touches[0].pageX - 30 + 'px';
    }
};

function logSwipeEnd(event) {
    event.preventDefault();

    // if (endX > startX) {
    //     console.log("右向き");
    // } else {
    //     console.log("左向き");
    // }
    // if (endY > startY) {
    //     console.log("下向き");
    // } else {
    //     console.log("上向き");
    // }
    imgTarget = null;
};