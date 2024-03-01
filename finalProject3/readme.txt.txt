Struktur Folder finalProject3
/Test Cases: Direktori ini berisi kode sumber test case proyek.
    Pedoman peletakan file:
    1. Test case dikelompokkan berdasarkan platform (Mobile, Website, etc)
    2. Test case dikelompokkan berdasarkan nama aplikasi
    3. Test case dikelompokkan ke dalam dua kelompok, Common Test Case dan Main Test Case. 
        a. Common Test Case merupakan test case dasar yang akan sering dipanggil oleh test case lain. Penamaan file test case pada Common Test Case menggunakan format: TPXXX-NamaFileCommonTestCase
        b. Main Test Case merupakan test case utama yang akan ditambahkan ke dalam Test Suite. Penamaan file test case pada Main Test Case menggunakan format: TCXXX-NamaFileMainTestCase
 
 /Object Repository: Direktori ini berisi objek yang akan digunakan di dalam test case.
    Pedoman peletakan file:
    1. Object dikelompokkan berdasarkan platform (Mobile, Website, etc)
    2. Object dikelompokkan berdasarkan nama aplikasi
    3. Khusus object website dikelompokkan lagi berdasarkan halamannya.
    4. Penamaan file object menggunakan format: namaobject_Keterangan Object

/Test Suites: Direktori yang berisi kumpulan test case
    Pedoman peletakan file:
    1. Test Suite Collection berada di folder utama Test Suite. Dengan penamaan file: TSCXXX-NamaFileTestSuiteCollection
    2. Test Suite dikelompokkan berdasarkan platform (Mobile, Website, etc). Dengan penamaan file: TSXXX-NamaFileTestSuite

/Data Files: Direktori yang berisi file yang menyimpan test data yang akan digunakan dalam menjalankan test case
    Dengan penamaan file: namaFileDataFile

/Reports: Direktori yang berisi kumpulan report yang otomatis tergenerate setelah menjalankan Test Suite atau Test Suite Collection

/Resource: Direktori yang berisi kumpulan file eksternal seperti excel, CSV, database, hingga .apk