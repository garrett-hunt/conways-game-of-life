import { Grid } from "../Pages/Homepage/Homepage";

const shift = 47; // shifts code to more common characters that users are more familiar with
const shiftChar = String.fromCharCode(shift);

export const encodeArray = (bitArr: Grid): string => {
  const rows = bitArr.length;
  const cols = bitArr[0].length;
  const dimensions = `${rows}x${cols}:`;

  const flatBitArr = bitArr.flat();

  const encodedString = flatBitArr
    .reduce((acc: string[], _, i) => {
      if (i % 8 === 0) {
        const byteString = flatBitArr.slice(i, i + 8).join("");
        const charcode = String.fromCharCode(parseInt(byteString, 2) + shift); // paddding is added becasue fromCharCode uses UTF-16
        acc.push(charcode);
      }
      return acc;
    }, [])
    .join("");

  const regex = new RegExp(`${shiftChar}{3,}`, "g"); // Regex shortens long sequences of the same character
  const simplifiedEncodedString = encodedString.replace(
    regex,
    (match) => `(${match.length})`
  );

  return dimensions + simplifiedEncodedString;
};

export const decodeString = (encodedStr: string): Grid => {
  const [header, data] = encodedStr.split(":");
  const [rows, cols] = header.split("x").map(Number);

  const bitString = data
    .replace(/\((\d+)\)/g, (_, count) => shiftChar.repeat(Number(count)))
    .split("")
    .map((char) => (char.charCodeAt(0) - shift).toString(2).padStart(8, "0"))
    .join("");

  const intArr = bitString.split("").map(Number);

  return Array.from({ length: rows }, (_, i) =>
    intArr.slice(i * cols, (i + 1) * cols)
  );
};
