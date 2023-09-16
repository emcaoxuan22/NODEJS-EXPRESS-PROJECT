async function check1() {
        console.log("vao day khogn")
        Promise.reject(new Promise((resolve, reject) => {
            
        }))
        console.log("dau la gi",a)
    
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
const b = check1().then(data => console.log('dasd', data)).catch(data => console.log(data))
setTimeout(() => {
    console.log(b)
}, 1000);