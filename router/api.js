const express = require('express');
const { set } = require('express/lib/application');
const router = express.Router();
const fs = require('fs');

let menu = require('../menu.json');
// console.log(menu);

const chooseRandomMenu = (length, source) => {
  const keys = Object.keys(source);
  while(keys.length > length){
    const idx = Math.floor(Math.random() * keys.length);
    keys.splice(idx,1);
  }
  return keys;
};

const filterMenu = (source, condArr) => {
  const keys = Object.keys(source);
  const condKeys = Object.keys(condArr);
  
  let target = {};

  for(let i = 0; i < keys.length; i++){
    let cond = true;
    for(let j = 0; j < condKeys.length; j++){
      if(condArr[condKeys[j]] == 'true' && source[keys[i]].findIndex((cond) => condKeys[j] == cond) == -1){
        cond = false;
        break;
      }
      if(condArr[condKeys[j]] == 'false' && source[keys[i]].findIndex((cond) => condKeys[j] == cond) != -1){
        cond = false;
        break;
      }
    }

    if(cond){
      target[keys[i]] = source[keys[i]];
    }
  }

  return target;
}


const dailyMenu = (length) => {
  let date = new Date();
  let tempmenu = Object.keys(menu);
  const seed = (date.getMonth() + 1)*100 + date.getDate() + 1;
  while(tempmenu.length > length){
    tempmenu.splice(seed%tempmenu.length,1);
  }

  return tempmenu;
};

const randomMenu = (length, condArr) => {
  let tempmenu = filterMenu(menu, condArr);
  return chooseRandomMenu(length, tempmenu);
}

router.get('/', (req, res) => {
  res.redirect('/api/help');
});

router.get('/help', (req, res) => {
  res.redirect('https://github.com/raipier8818/lunchAPI/blob/main/readme.md');
});

router.get('/lunch', (req, res) => {
  let length = req.query.length == undefined ? req.query.length = 1 : parseInt(req.query.length);
  let random = req.query.random == undefined ? req.query.random = "false" : String(req.query.random);
  console.log(req.query);
  delete req.query.length;
  delete req.query.random;

  length = length > 10 ? 10 : length;
  length = length < 1 ? 1 : length;

  if(random == "false"){
    res.json({"lunch": dailyMenu(length)});
    return;
  }else{
    res.json({"lunch": randomMenu(length, req.query)});
    return;
  }
});

router.get('/lunch/menu', (req, res) => {
  res.json({menu: Object.keys(menu)});
});

router.get('/lunch/tag',(req, res) => {
  const keys = Object.keys(menu);
  let tags = new Set();

  for(let i = 0; i < keys.length; i++){
    for(let j = 0; j < menu[keys[i]].length; j++){
      tags.add(menu[keys[i]][j]);
    }
  }

  res.json({tag: Array.from(tags)});
});


router.post('/lunch', (req, res) => {
  Object.assign(menu, req.body);
  fs.writeFileSync('./menu.json', JSON.stringify(menu, null, 2));
  res.json({added: Object.keys(req.body)});
});

// router.delete('/lunch', (req, res) => {
//   const menus = Object.keys(req.query);
//   for(let i = 0; i < menus.length; i++){
//     delete menu[menus[i]];
//   }
//   fs.writeFileSync('./menu.json', JSON.stringify());
// });


module.exports = router;