

var store = new Vuex.Store({
    state: {
        src: [
            '../media/dice1.png',
            '../media/dice2.png',
            '../media/dice3.png',
            '../media/dice4.png',
            '../media/dice5.png',
            '../media/dice6.png',
        ],
        rounds: 0,
        chosenProtocol: {},
        protocolIsChosen: false,
        score: 0,
        protocols: [
            {
                chosen: false,
                name: "Ettor",
                points: 0,
                isAvailable: true,
                givesPoints: true,
                condition: "element.roll === 1",
                pointType: "add"
            },
            {
                chosen: false,
                name: "Tvåor",
                points: 0,
                isAvailable: true,
                givesPoints: true,
                condition: "element.roll === 2",
                pointType: "add"
            },
            {
                chosen: false,
                name: "Treor",
                points: 0,
                isAvailable: true,
                givesPoints: true,
                condition: "element.roll === 3",
                pointType: "add"
            },
            {
                chosen: false,
                name: "Fyror",
                points: 0,
                isAvailable: true,
                givesPoints: true,
                condition: "element.roll === 4",
                pointType: "add"
            },
            {
                chosen: false,
                name: "Femmor",
                points: 0,
                isAvailable: true,
                givesPoints: true,
                condition: "element.roll === 5",
                pointType: "add"
            },
            {
                chosen: false,
                name: "Sexor",
                points: 0,
                isAvailable: true,
                givesPoints: true,
                condition: "element.roll === 6",
                pointType: "add"
            },
            {
                chosen: false,
                name: "Ett par",
                points: 0,
                isAvailable: true,
                givesPoints: true,
                condition: 2,
                pointType: "duplicates"
            },
            {
                chosen: false,
                name: "Två par",
                points: 0,
                isAvailable: true,
                givesPoints: true,
                condition: 2,
                pointType: "doubledouble"
            },
            {
                chosen: false,
                name: "Tretal",
                points: 0,
                isAvailable: true,
                givesPoints: true,
                condition: 3,
                pointType: "duplicates"
            },
            {
                chosen: false,
                name: "Fyrtal",
                points: 0,
                isAvailable: true,
                givesPoints: true,
                condition: 4,
                pointType: "duplicates"
            },
            {
                chosen: false,
                name: "Liten stege",
                points: 0,
                isAvailable: true,
                givesPoints: true,
                condition: [1, 2, 3, 4, 5],
                pointType: "ladder"
            },
            {
                chosen: false,
                name: "Stor stege",
                points: 0,
                isAvailable: true,
                givesPoints: true,
                condition: [2, 3, 4, 5, 6],
                pointType: "ladder"
            },
            {
                chosen: false,
                name: "Kåk",
                points: 0,
                isAvailable: true,
                givesPoints: true,
                condition: 6,
                pointType: "tripledouble"
            },
            {
                chosen: false,
                name: "Chans",
                points: 0,
                isAvailable: true,
                givesPoints: true,
                condition: true,
                pointType: "add"
            },
            {
                chosen: false,
                name: "Yatzy",
                points: 0,
                isAvailable: true,
                givesPoints: true,
                condition: 'none',
                pointType: "yatzy"
            },
        ],
        dice: [{
            roll: 6,
            available: true
        },
        {
            roll: 6,
            available: true
        },
        {
            roll: 6,
            available: true
        },
        {
            roll: 6,
            available: true
        },
        {
            roll: 3,
            available: true
        }],
        savedDice: []
    },
    mutations: {
        rollDice: function(state){
            var roll = [];
            for(var i = 0; i < state.dice.length; i++){
                if(state.dice[i].available){
                    roll[i] = {
                    roll: Math.floor(Math.random() * 6 + 1),
                    available: true
                }}else{
                    roll[i] = state.dice[i];
                }
            }
        Vue.set(state, 'dice', roll) 
    },
        saveDice: function(state, payload){
            state.dice[payload].available = false;
        },
        returnDice: function(state, payload){
            payload.available = true;
            
        },
        returnAllDice: function(state){
            state.dice.forEach(dice => {
                dice.available = true;
            })
        },
        addToScore: function(state){
            state.score += state.chosenProtocol.points;
        },
        addAmountToScore: function(state, payload){
            state.score += payload;
        },
        resetScore: function(state){
            state.score = 0;
        },
        resetProtocols: function(state){
            state.protocols.forEach(protocol => {
                protocol.points = 0;
                protocol.isAvailable = true;
                protocol.chosen = false;
            })
        },
        removeFromScore: function(state, payload){
            state.score -= payload;
        },
        chooseProtocol(state, protocol){
            state.chosenProtocol.chosen = false;
            state.chosenProtocol = protocol;
            state.chosenProtocol.chosen = true;
            state.protocolIsChosen = true;
        },
        makeProtocolUnavailable(state){
            state.chosenProtocol.isAvailable = false;  
        },
        protocolIsNotChosen(state){
            state.protocolIsChosen = false;
            state.chosenProtocol = {};
        },
        addToRounds(state){
            state.rounds++;
        },
        resetRounds(state){
            state.rounds = 0;
        }
    },
    getters: {
        protocols: state => {
            return state.protocols;
        },
        dice: state => {
            return state.dice;
        },
        savedDice: state => {
            return state.dice.filter(v => {
                return !(v.available);
            })
        },
        score: state => {
            return state.score;
        },
        protocolIsChosen: state => {
            return state.protocolIsChosen;
        },
        chosenProtocol: state => {
            return state.chosenProtocol;
        },
        rounds: state => {
            return state.rounds;
        },
        srces: state => {
            return state.src;
        }
    },
    actions: {
        rollDice: function(context, payload){
            context.commit('rollDice', payload);
        }
    }
})

var selection = Vue.component('protocols', {
    template: `
   
    <div class="square" id="categories">
           <button v-for="protocol in protocols" @click="saveProtocol(protocol)" :class="{ 'pointGiving' : (protocol.givesPoints  && protocol.isAvailable), 'unavailable-category' : !(protocol.isAvailable), 'chosen-category' : (protocol.chosen && protocol.isAvailable)}" class="category-items" :class="{notAvailable : !(protocol.isAvailable)}" :disabled="!protocol.isAvailable"> 
                       <p class="protocol-name"> {{protocol.name}}</p>{{protocolPoints(protocol)}} <p class="points">{{protocol.points}} </p></button> 
                              
                        
                         
           <button class="category-items" :disabled="true"> <p class="protocol-name">Bonus points</p> <p v-if="bonusPoints >= 63" class="points">50</p><p v-else class="points">0</p></button>                 
    </div>
    `,
    data() {
        return {
            bonus: false,
        }
    },
    
    computed: {
        ...Vuex.mapGetters([
            'dice',
            'score',
            'savedDice',
            'protocolIsChosen',
            'chosenProtocol',
            'rounds',
            'protocols'
        ]),
        reset(){
            this.protocols.forEach(protocol => {
                protocol.isAvailable = true;
            });
            this.bonus = false;
        },
        bonusPoints(){
            if(!this.bonus){
            var bonusPoints = 0;
            for(var i = 0; i < 6; i++){
                if(!(this.protocols[i].isAvailable))
                 bonusPoints += this.protocols[i].points;
            }
            if(bonusPoints >= 63){
                this.$store.commit('addAmountToScore', 50);
                this.bonus = true;
            }
            return bonusPoints;
        }
            return 63;
        },
        sortedDice(){
            return this.savedDice.slice().sort((roll1, roll2) => {
                if(roll1.roll > roll2.roll){
                    return 1;
                }else if(roll1.roll < roll2.roll){
                    return -1;
                }else{
                    return 0;
                }
            });
        },
        backwardsSortedDice(){
            return this.savedDice.slice().sort((roll1, roll2) => {
                if(roll1.roll > roll2.roll){
                    return -1;
                }else if(roll1.roll < roll2.roll){
                    return 1;
                }else{
                    return 0;
                }
            });
        }
       

    },
    methods: {
        equalDice(condition){
            
            var isEqual = true;
            points = 0;
            for(var i = 0; i < this.sortedDice.length; i++){
                if(condition[i] != this.sortedDice[i].roll){
                   isEqual = false;
                }
               
                    
            }
            if(isEqual){
                points = this.addDice(true);
            }
            return points;
        },
        duplicateDice(condition){
            var points = 0;
            var hasDuplicates = true;
            if(this.savedDice.length === condition){
                for(var i = 1; i < condition; i++){
                    if(this.sortedDice[0].roll !== this.savedDice[i].roll)
                        hasDuplicates = false;
                }
                if(hasDuplicates){
                    points = this.addDice(true)
                }
            }
            
            return points;
        },
        addDice(condition){
            var points = 0;
            this.savedDice.forEach(element => {
                if(eval(condition)){
                    points += element.roll;
            }
            });
      
            return points;
        },
         protocolPoints(protocol){
                var points = 0;
            if(protocol.isAvailable){    
            switch(protocol.pointType){
                case "add": 
                            points = this.addDice(protocol.condition);
                        break;
                case "duplicates": 
                            points = this.duplicateDice(protocol.condition);
                        break;
                case  "ladder":
                        if(this.savedDice.length === 5){
                            points = this.equalDice(protocol.condition);
                        }
                        break;
                case "tripledouble":
                        if(this.savedDice.length === 5){
                            if(this.sortedDice[0].roll !== this.sortedDice[3].roll){
                                if((this.sortedDice[0].roll === this.sortedDice[1].roll &&
                                   this.sortedDice[0].roll === this.sortedDice[2].roll &&
                                   this.sortedDice[3].roll === this.sortedDice[4].roll) || 
                                   (this.sortedDice[4].roll === this.sortedDice[3].roll &&
                                    this.sortedDice[4].roll === this.sortedDice[2].roll &&
                                    this.sortedDice[0].roll === this.sortedDice[1].roll)){
                                        points = this.addDice(true);
                                       
                                   }
                                } 
                            }
                        break; 
               case "doubledouble":                                 
                         if(this.savedDice.length === 4){
                            if(this.sortedDice[0].roll !== this.sortedDice[2].roll &&
                               this.sortedDice[0].roll === this.sortedDice[1].roll &&
                               this.sortedDice[2].roll === this.sortedDice[3].roll){
                                 points = this.addDice(true);
                               }
                        }
                        break;
               case "yatzy": {
                        if(this.savedDice.length === 5){
                            if(this.savedDice[0].roll === this.savedDice[1].roll &&
                               this.savedDice[0].roll === this.savedDice[2].roll &&
                               this.savedDice[0].roll === this.savedDice[3].roll &&
                               this.savedDice[0].roll === this.savedDice[4].roll)
                                points = 50;
                        }
                        break;    
               }         
            }    

            if(points > 0)
                protocol.givesPoints = true;
            else
                protocol.givesPoints = false;  
        
            protocol.points = points;
        }
              
        },
        saveProtocol(protocol){
            this.$store.commit('chooseProtocol', protocol)
        },
    }
    
})
    

var dice = Vue.component('dice', {
    template: `
         
    <div id="gameplay">
    <div v-for="(index, die) in dice" id="dice{{index}}" @click="saveDice(index)" :class="{ 'used-dice' : !(die.available) }" class="dice"><img :src="srces[die.roll-1]"></div>
    <p id="nr-of-rolls"><strong>Roll:</strong> {{rolls}}</p>
    <div id="btn-holder"> 
        <button class="btn" @click="nextRound" :class="{'disabled-btn': !(protocolIsChosen)}" :disabled="!(protocolIsChosen)" id="done-btn">DONE</button>
        <button class="btn" @click="rollDice" v-bind:class="{ 'disabled-btn' : rolls >= 3 || dice.length === 0 }" :disabled="rolls >= 3 || dice.length === 0" id="roll-btn">ROLL</button>
    </div>
    </div>  
    `,
    data(){
        return {
            rolls: 1,
        }
    },
    methods: {
        playAudio(file){
            var audio = new Audio(file);
            audio.play();
        },
        saveDice(index){
            this.$store.commit('saveDice', index);
        },
        returnDice(index){
            this.$store.commit('returnDice', index);
        },
        rollDice(){
            this.$store.dispatch('rollDice')
            this.playAudio('../media/dice-shake.mp3');
            this.rolls++;
        },
        nextRound(){
            this.playAudio('../media/dice-shake2.mp3');
            this.$store.commit('returnAllDice')
            this.$store.dispatch('rollDice')
            this.rolls = 1;
            this.$store.commit('makeProtocolUnavailable')
            this.$store.commit('addToScore')
            this.$store.commit('protocolIsNotChosen')
            this.$store.commit('addToRounds');
            if(this.rounds === 16){
                if(this.rounds === 16)
                new Audio('../media/cheer.mp3').play()
            }
        }
    },
    computed: {
        ...Vuex.mapGetters([
            'dice',
            'savedDice',
            'protocolIsChosen',
            'rounds',
            'srces'
        ])
        }
    
})

var startMenu = Vue.component('start-menu', {
    template: `
    
        <div  :class="{'start-menu' : (rounds === 0 || rounds === 16)}" v-show="rounds === 0 || rounds === 16">
            <div class="beginGame">
            <div v-if="rounds < 16">
            <h2>It sure is Yatzy</h2>
            <p>Press the <strong>'ROLL'</strong> button to roll your dice!</p>
            <p>You've got 3 rolls per turn.</p>
            <p>Click on the dice to save them on your turn.</p>
            <p>Press the <strong>'DONE'</strong> button to finish your turn.</p>
            <p>You must choose a point-protocol.</p>
            <p><strong style="color:green">Green</strong> means they give you points.</p>
            <p><strong style="color:magenta">Pink</strong> means it is your selected protocol.</p>
            <p>You can only use a protocol once.</p>
            <p>Have fun I guess!!</p>
            </div>

            <div v-else>
            <h2 style="color:magenta;">Final Score: <span style="color:blue">{{score}}</span></h2>
            <p>Wooaah, woaaah!! Good job, you did the Yatzy !!!!</p>
            <p>I've never been more proud !!!</p>
            </div>

            <button @click="newGame" class="btn start-btn" >New Game</button>
            </div>
            </div>
    `,
    methods: {
        invisible: function(){
            
        },
        newGame: function(){
            this.$store.commit('resetRounds');
            this.$store.commit('addToRounds');
            this.$store.commit('resetScore');
            this.$store.commit('resetProtocols');
        }
    },
    computed: {
        ...Vuex.mapGetters([
            'rounds',
            'score'
        ])
    }
})
var menu = Vue.component('menu', {
    template: `<div class="square" id="menu">
                    <div class="used-dice-holder">
                        <h3>Saved dice</h3>
                   
                        <div class="selected-dice" style="display:inline-block;" @click="returnDice(dice)" v-for="dice in savedDice"><img :src="srces[dice.roll-1]"></div>
                    
                        </div>
                    <div id="total-score"><h1 id="score-title">Score</h1><h1 id="score">{{score}}</h1></div>
                </div>`,
    computed: {
        ...Vuex.mapGetters([
            'savedDice',
            'score',
            'rounds',
            'srces'
         ] )
    },
    methods: {
        ...Vuex.mapMutations([
            'returnDice'
        ])
    }
})
var app = new Vue({
    el: '#app',
    template: `
    <div class="container" >
    <menu></menu>
    <dice></dice>
    <start-menu></start-menu>
    
    <protocols></protocols>

    </div>
    `,
    store: store,
    data: {
        chosenProtocol: true
    },
    methods: {
        chooseProtocol(){
            this.chosenProtocol = true
        }
    },
    computed: {
        ...Vuex.mapGetters([
            'savedDice',
            'rounds'
        ])
    },
    created: 
        function(){
            this.$store.dispatch('rollDice');
        }
});