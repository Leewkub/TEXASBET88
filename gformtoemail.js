const onFormSubmit = (e) => {
 const course = e.values[1] 
 const timestudy = e.values[2] 
 const score = e.values[3] 
 const Detail = e.values[4] 
 const email = e.values[5] 
 const subject = 'แบบประเมินผู้สอน'

 const body = `
ขอบคุณสำหรับการประเมินผู้สอน
และคำแนะนำ ทางเราจะปรับปรุงและพัฒนาให้ดียิ่งขึ้นต่อไป
🖊 ผู้ให้บริการ iton5
>>>>>>>>>>>>>>>>>>>>>>>
Email：${email}
เรื่องที่เรียน：${course}
เวลาที่คุณเรียน：${timestudy}
คะแนน：${score}
ข้อเสนอแนะอื่นๆ：${Detail}
 `

 GmailApp.sendEmail(email, subject, body)
}
