function downAudios(ids) {
  console.log(ids);
  let downText = "let AUDIOS = {";
  let audios = AUDIOS.filter(audio => {
    return ids.includes(audio.id)
  });
  console.log(audios);
  audios.forEach(audio => {
    downText += `
  "${audio.name}":new Howl({
    src: [
      "${audio.base64}"
    ],
    autopaly: false,
    loop: ${audio.loop},
    volume: 1,
  }),`;
  });
  downText += "\n}";

  var aTag = document.createElement("a");
  var blob = new Blob([downText]);
  aTag.download = "audios.js";
  aTag.href = URL.createObjectURL(blob);
  URL.revokeObjectURL(blob);
}

let AUDIOS = [
  { id: 0, name: "bgm", catogary: "", src: "audios/bgm/lobby_turkey.mp3", downName: "" ,loop:false},
];
