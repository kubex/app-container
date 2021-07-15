function getNumber()
{
  return Math.floor(Math.random() * 256);
}

document.querySelector('button').style.background = 'rgb(' + getNumber() + ',' + getNumber() + ',' + getNumber() + ')';
