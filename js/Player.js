class Player {
  constructor() {
    this.name = null
    this.index = null
    this.positionX = 0
    this.positionY = 0
    this.rank = 0
    this.fuel = 185
    this.life = 185
    this.score = 0
  }

  getCount(){
    var playerCountRef = database.ref("playerCount")
    playerCountRef.on("value", function(data){
      playerCount = data.val()
    })
  }

  UpdateCount(count){
    database.ref("/").update({
      playerCount: count
    })
  }

  update() {
    var playerIndex = "players/player" + this.index;
    database.ref(playerIndex).update({
      positionX: this.positionX,
      positionY: this.positionY,
      rank: this.rank,
      score: this.score,
      life: this.life
    });
  }

  addPlayer(){
    var playerIndex = "players/player"+this.index
    if(this.index === 1){
      this.positionX = width/2 - 100 //esquerda
    }else{
      this.positionX = width/2 + 100 //direita
    }
                              //setar/colocar
    database.ref(playerIndex).set({
      name: this.name,
      positionX: this.positionX,
      positionY: this.positionY,
      rank: this.rank,
      score: this.score,
      life: this.life
    })
  }

  static getPlayersInfo() {
    var playerInfoRef = database.ref("players");
    playerInfoRef.on("value", data => {
      allPlayers = data.val();
    });
  }

  getCarsAtEnd(){
    database.ref("carsAtEnd").on("value", data => {
      this.rank = data.val();
    });
  }

  static carsAtEnd(rank){
    database.ref("/").update({
      carsAtEnd: rank
    }) //jason {"chave": "valor"}
  }
}
