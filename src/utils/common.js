export default {
    'Sequential':0,
    'Single':1,
    'random':2
}

export const TYPE={
  'song':1,
  'artist':100,
  'album':10,
  'video':1014,
  'lyric':1006,
  'songlist':1000,
  'radio':1009,
  'user':1002
}

// 将整数转换成 时：分：秒的格式
export // 将整数转换成 时：分：秒的格式
function realFormatSecond(second) {
  var secondType = typeof second;

  if (secondType === "number" || secondType === "string") {
    second = parseInt(second);

    var hours = Math.floor(second / 3600);
    second = second - hours * 3600;
    var mimute = Math.floor(second / 60);
    second = second - mimute * 60;
    if (hours == 0) {
      return ("0" + mimute).slice(-2) + ":" + ("0" + second).slice(-2);
    }
  } else {
    return "00:00";
  }
}

