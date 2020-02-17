/**
 * 문자열이 특정길이 이상일때 ...으로 출력해주는 메서드
 */
export const textLengthOverCut = (txt, len, lastTxt) => {
  if (len == "" || len == null) { // 기본값
    len = 30;
  }
  if (lastTxt == "" || lastTxt == null) { // 기본값
    lastTxt = "...";
  }
  if (txt.length > len) {
    txt = txt.substr(0, len) + lastTxt;
  }
  return txt;
};

/**
 * bookCode에 따라 '구약' || '신약' 문자열 출력
 */
export const printIsNewOrOldBibleByBookCode = (bookCode) => {
  if(bookCode >= 1 && bookCode < 40) {
    return '구약';
  } else if (bookCode <= 66) {
    return '신약';
  } else {
    return '올바른 bookCode가 아닙니다.';
  }
};
