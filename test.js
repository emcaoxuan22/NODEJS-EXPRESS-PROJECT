async function check1() {
  await new Promise((resolve, reject) => {
    //   setTimeout(() => {
    //     reject();
    //   }, 5000);
    reject();
  });
  console.log("qua buoc nay");
}

// async function check2() {
//     try {
//         const  a =  check1()

//         console.log('dsfsd',a )
//     } catch (error) {
//         console.log(error)
//     }
//     console.log('xuong day')
// }
// const b = check1()
//   .then((data) => console.log("vao cham then", data))
//   .catch((data) => console.log("vao cham catch", data));
// console.log("dxuong dy"),
//   setTimeout(() => {
//     console.log(b);
//   }, 1000);

const x = Promise.resolve(check1())
  .then((data) => console.log("vaothen"))
  .catch((data) => console.log("vao catch"));
setTimeout(() => {
  console.log(x);
}, 2000);
