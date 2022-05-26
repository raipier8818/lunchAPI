# Lunch API

Request URL | Method | Response Format | Description
|---|---|---|---|
`/api/help`|GET||Return this page.
`/api/lunch`|GET|JSON|Return the menu corresponding a query.
`/api/lunch`|POST|JSON|Add or edit menu.
`/api/lunch/menu`|GET|JSON|Return all menu.
`/api/lunch/tag`|GET|JSON|Return all tags in menu.

## How to use

- `GET /api/lunch`
    - `length`(int) : Set the number of menu. Default is 1 and max is 10.
    - `random`(bool) : Set the menu chosen randomly. Default is false.
    - tags(`name`: bool) : Set the condition include or not.

```
GET /api/lunch?length=3&random=true&밥=false
```

- `POST/ api/lunch`
```json
{
    "menu1": ["tag1", "tag2"],
    "menu2": ["tag1", "tag3"],
    ...
}
```
Link : https://dontasklunchmenu.herokuapp.com/
