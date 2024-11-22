# Library Management System

Bu proje, kitap yönetimi, yazarlar, yayıncılar ve kategorilerle ilgili işlemleri yapmanıza olanak tanır. Kullanıcılar kitapları, yazarları, yayıncıları ve kategorileri görüntüleyebilir, ekleyebilir, güncelleyebilir ve silebilir. Bu uygulama, React ile yazılmış bir frontend ve RESTful API sağlayan bir backend içerir.

[Canlı Görünüm](https://gleeful-hamster-87bfab.netlify.app/)

## Özellikler

- Kitapları listeleme, ekleme, güncelleme ve silme
- Yazarları listeleme, ekleme, güncelleme ve silme
- Yayıncıları listeleme, ekleme, güncelleme ve silme
- Kategorileri listeleme, ekleme, güncelleme ve silme
- Kitaplar için yazar, yayıncı ve kategori ilişkileri

## Teknolojiler

- React.js
- React Router
- Axios
- React Toastify

## API Endpoints

### Kitaplar

- `GET /api/books`: Tüm kitapları listeleme
- `GET /api/books/{id}`: Kitap detaylarını getirme
- `POST /api/books`: Yeni kitap ekleme
- `PUT /api/books/{id}`: Kitap bilgilerini güncelleme
- `DELETE /api/books/{id}`: Kitap silme

### Yazarlar

- `GET /api/authors`: Tüm yazarları listeleme
- `GET /api/authors/{id}`: Yazar detaylarını getirme
- `POST /api/authors`: Yeni yazar ekleme
- `PUT /api/authors/{id}`: Yazar bilgilerini güncelleme
- `DELETE /api/authors/{id}`: Yazar silme

### Yayıncılar

- `GET /api/publishers`: Tüm yayıncıları listeleme
- `GET /api/publishers/{id}`: Yayıncı detaylarını getirme
- `POST /api/publishers`: Yeni yayıncı ekleme
- `PUT /api/publishers/{id}`: Yayıncı bilgilerini güncelleme
- `DELETE /api/publishers/{id}`: Yayıncı silme

### Kategoriler

- `GET /api/categories`: Tüm kategorileri listeleme
- `GET /api/categories/{id}`: Kategori detaylarını getirme
- `POST /api/categories`: Yeni kategori ekleme
- `PUT /api/categories/{id}`: Kategori bilgilerini güncelleme
- `DELETE /api/categories/{id}`: Kategori silme
