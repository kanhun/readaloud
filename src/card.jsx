import "./styles.css";

export function Card(props) {
  let word = "";
  props.word.map((i) => (word += i.char));

  // base-vowel array
  let vowelLayer = [];
  let subsyl = "";
  for (let i = word.length - 1; i >= 0; i--) {
    if ("ิีึืุูัํ็".includes(word[i])) {
      subsyl += word[i];
    } else if ("่้๊๋".includes(word[i])) {
      continue;
    } else {
      if (subsyl.length > 0) {
        subsyl += word[i];
      } else {
        subsyl = word[i];
      }
      vowelLayer.push(subsyl.split("").reverse().join(""));
      subsyl = "";
    }
  }

  return (
    <div className="card">
      &nbsp;
      <div className="base">
        <span class="index">{props.index + 1}. </span>
        {props.word.map(
          (i) =>
            "กขฃคฅฆงจฉชซฌญฎฏฐฑฒณดตถทธนบปผฝพฟภมยรลวศษสหฬอฮาเแโใไำะา".includes(
              i.char
            ) && <span style={{ color: i.color }}>{i.char}</span>
        )}
      </div>
      <div className="vowel">
        <span class="index">{props.index + 1}. </span>
        {vowelLayer.reverse().map((i) => (
          <span style={{ color: "#FF0000" }}>{i}</span>
        ))}
      </div>
      <div className="accent">
        <span class="index">{props.index + 1}. </span>
        <span style={{ color: "#32CD32" }}>{word}</span>
      </div>
    </div>
  );
}
