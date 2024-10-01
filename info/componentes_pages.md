### Routes: 

- /
- /dishes
- /menus
- /dishes/dish-detail/:id
- /dishes/add_dish
- /menus/menu_detail/:id
- /menus/add_dish

#### Pages:
- Home.jsx
- Dishes.jsx
- Menus.jsx
- AddDishForm.jsx
- AddMenuForm.jsx
- DishDetail.jsx
- MenuDetail.jsx

#### Componentes:
- Navbar.jsx
- DishCard.jsx
- MenuCard.jsx

#### URL
##### All Dishes
- GET http://localhost:5005/dishes
##### All Menus
- GET http://localhost:5005/menus
##### Dishes by Category
- GET http://localhost:5005/dishes?categoria={{categoria}}
##### Dishes by menuCategory
- GET http://localhost:5005/dishes?categoriaMenu={{categoriaMenu}}
##### Dish by id
- GET http://localhost:5005/dishes/:dishId
##### Modify Dish by id
- PATCH http://localhost:5005/dishes/:id
##### Menu by Id
- GET http://localhost:5005/menus/:id
##### Create dish
- POST http://localhost:5005/dishes
##### Create menu
- POST http://localhost:5005/menus
##### Delete dish
- DEL http://localhost:5005/dishes/:dishId
##### Delete menu
- DEL http://localhost:5005/menus/:Id
##### All Dishes in menu
- GET http://localhost:5005/menus/:menuId?_embed=dishes