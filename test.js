const text = '[如月群真] お兄ちゃんと一緒! (コミックメガストアH 2004年9月號)'


console.log('tt', text.split('[').map(item => item.substring(item.indexOf(']') + 1)).filter(item => item))
