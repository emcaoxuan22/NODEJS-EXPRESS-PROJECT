// async function check1() {
//   await new Promise((resolve, reject) => {
//     //   setTimeout(() => {
//     //     reject();
//     //   }, 5000);
//     reject();
//   });
//   console.log("qua buoc nay");
// }

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

// const x = Promise.resolve(check1())
//   .then((data) => console.log("vaothen"))
//   .catch((data) => console.log("vao catch"));
// setTimeout(() => {
//   console.log(x);
// }, 2000);
// process.nextTick(() => console.log(1));
// Promise.resolve().then(() => console.log(2));
// Promise.resolve().then(() => {
//     console.log(3);
//     process.nextTick(() => console.log(4));
//     Promise.resolve().then(() => console.log(5));
// }).then(() => {
//     console.log(6);
// });

// const fs = require('fs')


// // setTimeout(() => {
// //   console.log("time out 1")
// // }, 20);

// fs.readFile(__filename, () => {
//   console.log("this is read file 1 ")
// })

// setImmediate(() => {
//   console.log("imiditate 1")
// })


// for (let i = 0; i< 5000000000; i++){}

// function longcv() {
//   for (let index = 0; index < 2000000000000; index++) {
    
//   }
// }

// x = Promise.resolve(longcv())
// console.log(x)

// process.nextTick(() => console.log(1)); // hàm 1
// Promise.resolve().
// then(() => console.log(2)); // hàm 2
// const pms1 = Promise.resolve()
// .then(() => {
//     console.log(3); // hàm 3
//     process.nextTick(() => console.log(4)); //hàm 4
//     Promise.resolve().then(() => console.log(5)); //hàm 5
// })
// const pms2 = pms1.then(() => {
//     console.log(6); // hàm 6
// })

// output theo cá nhân em thì là -> 123654
// lý do: 
// sau khi thực hiện xong code đồng bộ thì sẽ bắt đầu chạy initial event loop
// Initial Loop
    // trong vòng initial loop thì hàm được đưa vào microtask sau khi libuv xử lý là : Hàm 1
    // tiếp theo các Hàm được đưa vào macrotask sẽ là : Hàm 2 -> Hàm 3 -> Hàm 6
// tiếp theo là đến giai đoạn thực thi Initial loop:
// output: ---> 123 (Lý do : Hàm 1 , Hàm 2 thực thi rất bình thường, khi đến hàm 3 em xin phân tích như sau:
// khi hàm 3 thực thi thì Hàm 4 sẽ được đưa vào Microtask và hàm 5 sẽ được đưa vào macrotask ,
// lúc này trong microtask chứa hàm 4 (chưa được thực thi do macrotask queu vẫn còn hàm trong hàng đợi)
// trong macrotask queu sẽ chứa hàm (Hàm 6 -> Hàm 5) do hàm 6 được đưa vào trước nên sẽ chạy trước
// --> kết quả sẽ là : 12365 (đến đây thì microtask đã trống và đến phase queu tiếp theo( nodejs có tận 6 phase queu)) 
// và trước khi sang phase tiếp theo nó sẽ check trong microtask và marcrotask 
// Nó thấy còn hàm 4 --> hàm 4 được thực thi
// từ đó kết quả sẽ là 123654

 
// output thực tế : -> 123564

new Promise(resolve => {
    resolve()
  })
  .then(() => {
    new Promise(resolve => {
        resolve()
      })
      .then(() => {
        console.log(1)
      }).then(() => {
        console.log('dsfsda')
      })
      
  })
  .then(() => {
    console.log(1.1)
    new Promise((resolve => {
        resolve()
      }))
      .then(() => {
        console.log(9)
        new Promise(resolve => {
            resolve()
          })
          .then(() => {
            console.log(4)
          })
      })
      .then(() => {
        console.log(5)
      })
  })
  .then(() => {
    console.log(3)
  })
console.log(0)

// 0 -> 1 -> 1.1