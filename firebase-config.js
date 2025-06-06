script>
        // إعداد Firebase
        const firebaseConfig = { 
            apiKey: "AIzaSyC7z9hhq51EhsdsWfAQmFEYNgCeYqkiAQ8",
            authDomain: "website-23082.firebaseapp.com",  // إزالة https://
            databaseURL: "https://website-23082-default-rtdb.firebaseio.com",
            projectId: "website-23082",
            storageBucket: "website-23082.firebasestorage.app",
            messagingSenderId: "G-RG84KMEBNK", // هذا قد يكون خطأ، عادةً يبدأ برقم
            appId: "1:650852775693:web:22a7acd661478d10a1a244"
        };
        firebase.initializeApp(firebaseConfig);

        // حفظ البيانات
        function saveData(event) {
            event.preventDefault(); // لمنع إعادة تحميل الصفحة
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;

            firebase.database().ref('users').push({
                name: name,
                email: email,
                timestamp: firebase.database.ServerValue.TIMESTAMP
            }).then(() => {
                alert("تم حفظ البيانات بنجاح!");
                // مسح الحقول بعد الحفظ
                document.getElementById('name').value = '';
                document.getElementById('email').value = '';
            }).catch(error => {
                console.error("Error saving data: ", error);
                alert("حدث خطأ أثناء الحفظ!");
            });
        }

        // ربط حدث submit للنموذج
        document.getElementById('dataForm').addEventListener('submit', saveData);

        // استرجاع البيانات وعرضها
        function loadData() {
            firebase.database().ref('users').once('value').then(snapshot => {
                const userList = document.getElementById('userList');
                userList.innerHTML = ''; // مسح المحتوى القديم

                if (snapshot.exists()) {
                    snapshot.forEach(childSnapshot => {
                        const user = childSnapshot.val();
                        const listItem = document.createElement("li");
                        listItem.textContent = `الاسم: ${user.name} - البريد: ${user.email}`;
                        userList.appendChild(listItem);
                    });
                } else {
                    userList.innerHTML = '<li>لا توجد بيانات</li>';
                }
            }).catch(error => {
                console.error("Error loading data: ", error);
            });
        }

        // تحميل البيانات عند فتح الصفحة
        window.addEventListener('DOMContentLoaded', loadData);

        // (اختياري) الاستماع للتحديثات في الوقت الحقيقي
        firebase.database().ref('users').on('child_added', (snapshot) => {
            // لتحديث القائمة فور إضافة مستخدم جديد دون الحاجة لتحديث الصفحة
            loadData();
        });
    </script>
