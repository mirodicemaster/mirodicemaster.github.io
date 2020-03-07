async function arrayDiceValue(dice) {
    //widget entries for stickers
    const sticker = []

    //widget position
    const viewport = await miro.board.viewport.getViewport();
    const x = viewport.x + (viewport.width / 2);
    const y = viewport.y + (viewport.height / 2);

    //Wait 10 secondes
    const waitOneSec = () => new Promise(r => setTimeout(r, 10000))

    //var Dice
    let arrayDice = Array.from(dice)
    let numberDice = arrayDice[0]
    var typeDice

    //Check dice type
    if (arrayDice[4]) {
        var typeDice = `${arrayDice[2]}${arrayDice[3]}${arrayDice[4]}`
    } else if (arrayDice[3]) {
        var typeDice = `${arrayDice[2]}${arrayDice[3]}`
    } else {
        var typeDice = `${arrayDice[2]}`
    }

    //Dice Values
    let diceValue = []
    for (let i = 0; i < numberDice; i++) {
        let roll = Math.floor(Math.random() * Math.floor(typeDice) + 1)
        diceValue.push(roll)
    }
    let finalDiceValue = diceValue.join(' + ')

    //Sum Value
    var resultValue = 0
    for (let i = 0; i < diceValue.length; i++) {
        resultValue += diceValue[i]
    }

    //Sticker text
    let text = `\nDés\n ${numberDice}d${typeDice}\n\nValeurs\n [${finalDiceValue}]\n\nRésultat\n ${resultValue}`

    //Push entries for sticker
    sticker.push(getRollWidget(text, x, y))

    //Create sticker then delete
    const rollwidget = (await miro.board.widgets.create(sticker))[0]
    await waitOneSec()
    await miro.board.widgets.deleteById(rollwidget.id)
}

function getRollWidget(text, x, y) {
    return {
      type: 'sticker',
      x: x,
      y: y,
      text: text
    }
}