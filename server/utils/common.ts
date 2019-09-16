import { getConnection } from "typeorm";
import { Global } from "../global";

function  convertMinsToHrmin (millseconds,insec) {
    var seconds = Math.floor(millseconds / 1000);
    if(insec){
      let sec = Math.floor(millseconds / 1000);
      return sec;
    }
    var days = Math.floor(seconds / 86400);
    var hours = Math.floor((seconds % 86400) / 3600);
    var minutes = Math.floor(((seconds % 86400) % 3600) / 60);
    seconds = seconds % 60;
    var dateTimeDurationString = '';

    if (days > 0 && (hours === 0 && minutes === 0))
      dateTimeDurationString += days > 1 ? days + 'd ' : days + 'd ';
    if (days > 0 && (hours > 0 || minutes > 0))
      dateTimeDurationString += days > 1 ? days + 'd ' : days + 'd ';
    if (hours > 0 && minutes > 0)
      dateTimeDurationString += hours > 1 ? hours + 'h ' : hours + 'h ';
    if (hours > 0 && minutes === 0)
      dateTimeDurationString += hours > 1 ? hours + 'h ' : hours + 'h ';
    if (minutes > 0)
      dateTimeDurationString += minutes > 1 ? minutes + 'm ' : minutes + 'm ';
    if (seconds > 0)
      dateTimeDurationString += seconds > 1 ? seconds + 's ' : seconds + 's ';
    return dateTimeDurationString;
  }

function dateDiff(date2, insec = false) {
    var current_date = new Date();
    // var current_date = new Date("Sat Apr 2 2018 15:04:00 GMT+0530 (IST)");

    var enddaydif =
      Math.abs(date2.getTime() - current_date.getTime()) /
      (1000 * 60 * 60 * 24);
    var enddayrnd = Math.round(enddaydif);
    // if(enddayrnd < 1) {
    var time = convertMinsToHrmin(
      Math.abs(date2.getTime() - current_date.getTime()),insec
    );
    return time;
    // } else if(enddayrnd == 1) {
    //   return 'Ends in ' + enddayrnd + ' day';
    // }else {
    //   return 'Ends in ' + enddayrnd + ' days';
    // }
  }


const latestBlockDetails = async()=> {
    let block_height = '',
        letest_block,
        letest_block_num = '',
        letest_block_duration = '';

      const BlockchainLatestBlockQuery = await getConnection(Global.network)
        .query(
          'SELECT timestamp,height,edge_bits,hash,secondary_scaling, previous_id, total_difficulty_cuckaroo, total_difficulty_cuckatoo, total_difficulty_progpow, total_difficulty_randomx FROM blockchain_block ORDER BY timestamp DESC LIMIT 1',
        )
        .catch(err_msg => {
          return(err_msg);
        });
      const BlockchainPreviousBlockQuery = await getConnection(Global.network)
        .query(
          'SELECT total_difficulty_cuckaroo, total_difficulty_cuckatoo, total_difficulty_progpow, total_difficulty_randomx FROM blockchain_block WHERE hash=' +
          "'" +
          BlockchainLatestBlockQuery[0].previous_id +
          "'",
        )
        .catch(err_msg => {
          return(err_msg);
        });

      let height = BlockchainLatestBlockQuery[0].height;
      var coin_existence;
      // if (height > 12960) {
      //   var remain_block = height - 12960;
      //   var coin_existence =
      //     1440 * 200 +
      //     1440 * 180 +
      //     1440 * 160 +
      //     1440 * 140 +
      //     1440 * 120 +
      //     1440 * 100 +
      //     1440 * 80 +
      //     1440 * 60 +
      //     1440 * 50 +
      //     25 * remain_block;
      // } else if (height > 11520) {
      //   var remain_block = height - 11520;
      //   var coin_existence =
      //     1440 * 200 +
      //     1440 * 180 +
      //     1440 * 160 +
      //     1440 * 140 +
      //     1440 * 120 +
      //     1440 * 100 +
      //     1440 * 80 +
      //     1440 * 60 +
      //     remain_block * 50;
      // } else if (height > 10080) {
      //   var remain_block = height - 10080;
      //   var coin_existence =
      //     1440 * 200 +
      //     1440 * 180 +
      //     1440 * 160 +
      //     1440 * 140 +
      //     1440 * 120 +
      //     1440 * 100 +
      //     1440 * 80 +
      //     remain_block * 60;
      // } else if (height > 8640) {
      //   var remain_block = height - 8640;
      //   var coin_existence =
      //     1440 * 200 +
      //     1440 * 180 +
      //     1440 * 160 +
      //     1440 * 140 +
      //     1440 * 120 +
      //     1440 * 100 +
      //     remain_block * 80;
      // } else if (height > 7200) {
      //   var remain_block = height - 7200;
      //   var coin_existence =
      //     1440 * 200 +
      //     1440 * 180 +
      //     1440 * 160 +
      //     1440 * 140 +
      //     1440 * 120 +
      //     remain_block * 100;
      // } else if (height > 5760) {
      //   var remain_block = height - 5760;
      //   var coin_existence =
      //     1440 * 200 +
      //     1440 * 180 +
      //     1440 * 160 +
      //     1440 * 140 +
      //     remain_block * 120;
      // } else if (height > 4320) {
      //   var remain_block = height - 4320;
      //   var coin_existence =
      //     1440 * 200 + 1440 * 180 + 1440 * 160 + remain_block * 140;
      // } else if (height > 2880) {
      //   var remain_block = height - 2880;
      //   var coin_existence = 1440 * 200 + 1440 * 180 + remain_block * 160;
      // } else if (height > 1440) {
      //   var remain_block = height - 1440;
      //   var coin_existence = 1440 * 200 + remain_block * 180;
      // } else {
      //   var coin_existence = height * 200;
      // }
      
      let DAY_HEIGHT = 1440
/// Height of the first epic block emission era
const BLOCK_ERA_1 = DAY_HEIGHT * 334;
/// Height of the second epic block emission era
const BLOCK_ERA_2 = BLOCK_ERA_1 + (DAY_HEIGHT * 470);
/// Height of the third epic block emission era
const BLOCK_ERA_3 = BLOCK_ERA_2 + (DAY_HEIGHT * 601);
/// Height of the fourth epic block emission era
const BLOCK_ERA_4 = BLOCK_ERA_3 + (DAY_HEIGHT * 800);
/// Height of the fifth epic block emission era
const BLOCK_ERA_5 = BLOCK_ERA_4 + (DAY_HEIGHT * 1019);
/// After the epic block emission era 6, each era will last 4 years (approximately 1460 days)
const BLOCK_ERA_6_ONWARDS = DAY_HEIGHT * 1460;
/// Block Reward that will be assigned after we change from era 5 to era 6.
const BASE_REWARD_ERA_6_ONWARDS = 0.15625;

let remaining_height = 0;
let currentReward = 16;
/// Compute the total reward generated by each block in a given height.
  if (height <= BLOCK_ERA_1) {
    coin_existence =  height * 16;
    currentReward = 16;
  } else if (height <= BLOCK_ERA_2) {
    remaining_height = height - BLOCK_ERA_1;
    coin_existence =  (16 * BLOCK_ERA_1) + 8 * remaining_height;
    currentReward = 8;
  } else if (height <= BLOCK_ERA_3) {
    remaining_height = height - BLOCK_ERA_2;
    coin_existence =  (16 * BLOCK_ERA_1) + (8 * BLOCK_ERA_2) + 4 * remaining_height;
    currentReward = 4;
  } else if (height <= BLOCK_ERA_4) {
    remaining_height = height - BLOCK_ERA_3;
    coin_existence =  (16 * BLOCK_ERA_1) + (8 * BLOCK_ERA_2) + (4 * BLOCK_ERA_3) + 2 * remaining_height;
    currentReward = 2;
  } else if (height <= BLOCK_ERA_5) {
    remaining_height = height - BLOCK_ERA_4;
    coin_existence =  (16 * BLOCK_ERA_1) + (8 * BLOCK_ERA_2) + (4 * BLOCK_ERA_3) + (2 * BLOCK_ERA_4) +1 * remaining_height; 
    currentReward = 1;
  } else {
    // After the era 6, we reduce the block rewards by half each 1460 days.
    // Minus 1 to include multiples in the same index
    // (i.e changes greater than to greater or equals to)
    
    let preious_circulation = (16 * BLOCK_ERA_1) + (8 * BLOCK_ERA_2) + (4 * BLOCK_ERA_3) + (2 * BLOCK_ERA_4) + (1 * BLOCK_ERA_5);

    let height_with_offset = height - (BLOCK_ERA_5 - 1);
    let exp = height_with_offset / BLOCK_ERA_6_ONWARDS;
    let reward_emission =  BASE_REWARD_ERA_6_ONWARDS / (1 << exp);
    coin_existence = preious_circulation + reward_emission ;
    currentReward = reward_emission;
  }

      letest_block = dateDiff(BlockchainLatestBlockQuery[0].timestamp,true);
      letest_block_num = letest_block; // "72"
      letest_block_duration = letest_block == 1 ? 'second ago' : 'seconds ago';
      const SECOND_POW_EDGE_BITS = 29;
      const BASE_EDGE_BITS = 24;

      if (BlockchainLatestBlockQuery[0].edge_bits == SECOND_POW_EDGE_BITS) {
        var hashvalue = BlockchainLatestBlockQuery[0].hash;
        var diff =
          (BlockchainLatestBlockQuery[0].secondary_scaling * 2 ** 64) /
          parseInt(hashvalue.substring(0, 16), 16);
        var result = Math.min(diff, 0xffffffffffffffff);
        var difficulty = Math.round(result);
      } else {
        var graph_weight =
          2 *
          2 ** (BlockchainLatestBlockQuery[0].edge_bits - BASE_EDGE_BITS) *
          BlockchainLatestBlockQuery[0].edge_bits;
        var hashvalue = BlockchainLatestBlockQuery[0].hash;
        var diff =
          (graph_weight * 2 ** 64) / parseInt(hashvalue.substring(0, 16), 16);
        var result = Math.min(diff, 0xffffffffffffffff);
        var difficulty = Math.round(result);
      }

      if (BlockchainLatestBlockQuery[0].previous_id) {
        var targetdifficultycuckaroo =
          BlockchainLatestBlockQuery[0].total_difficulty_cuckaroo -
          BlockchainPreviousBlockQuery[0].total_difficulty_cuckaroo;
        var targetdifficultycuckatoo =
          BlockchainLatestBlockQuery[0].total_difficulty_cuckatoo -
          BlockchainPreviousBlockQuery[0].total_difficulty_cuckatoo;
        var targetdifficultyprogpow =
          BlockchainLatestBlockQuery[0].total_difficulty_progpow -
          BlockchainPreviousBlockQuery[0].total_difficulty_progpow;
        var targetdifficultyrandomx =
          BlockchainLatestBlockQuery[0].total_difficulty_randomx -
          BlockchainPreviousBlockQuery[0].total_difficulty_randomx;
      }

      block_height = BlockchainLatestBlockQuery[0].height;
      var TotalCuckoo=parseInt(BlockchainLatestBlockQuery[0].total_difficulty_cuckatoo) +
                      parseInt(BlockchainLatestBlockQuery[0].total_difficulty_cuckaroo);


      let FOUNDATION_LEVY_ERA_1 = DAY_HEIGHT * 120;
      /// After the first foundation levy era, we decrease the foundation levy each year
      let FOUNDATION_LEVY_ERA_2_ONWARDS = DAY_HEIGHT * 365;


      /// The foundation levy in each era
     let FOUNDATION_LEVY = [
            0.0888, 0.0777, 0.0666, 0.0555, 0.0444, 0.0333, 0.0222, 0.0111, 0.0111,
        ];
        
        /// Compute the foundation levy for each block.
     let foundationReward = 16 * FOUNDATION_LEVY[0];
     let userReward = 16 - (FOUNDATION_LEVY[0]);
      if (height <= 0) {
           foundationReward =0;
           userReward = 0;
       } else if (height <= FOUNDATION_LEVY_ERA_1) { 
           foundationReward = currentReward  * FOUNDATION_LEVY[0];
           userReward = currentReward -foundationReward;
       } else {
            // We subtract 1 to include the last block of an era.
            let height_with_offset = height - FOUNDATION_LEVY_ERA_1 - 1;
            // We used the index 0 in the first era, therefore we offset the index by 1
            let index = (height_with_offset / FOUNDATION_LEVY_ERA_2_ONWARDS) + 1;
            
            if (index < FOUNDATION_LEVY.length ) {
                foundationReward = currentReward  *  FOUNDATION_LEVY[index];
                userReward = currentReward -foundationReward;
            } else {
                foundationReward = 0;
                userReward = 0;
            }
        }
        


      return {
        block_height,
        letest_block,
        letest_block_num,
        letest_block_duration,
        coin_existence,
        difficulty,
        targetdifficultycuckaroo,
        targetdifficultycuckatoo,
        targetdifficultyprogpow,
        targetdifficultyrandomx,
        TotalCuckoo,
        TotalDifficultyCuckaroo:BlockchainLatestBlockQuery[0].total_difficulty_cuckaroo,
        TotalDifficultyCuckatoo:BlockchainLatestBlockQuery[0].total_difficulty_cuckatoo,
        TotalDifficultyProgpow:BlockchainLatestBlockQuery[0].total_difficulty_progpow,
        TotalDifficultyRandomx:BlockchainLatestBlockQuery[0].total_difficulty_randomx,
        currentReward,
        foundationReward,
        userReward
      };
    }


async function Details (height) {
   if(height){

    const BlockchainLatestBlockQuery2 = await getConnection(Global.network)
    .query(
      "Select hash, height from blockchain_block Where height =" +height.replace(/[a-z]/gi, '')+" OR hash ='"+height+"'",
    )
    .catch(err_msg => {
      return(err_msg);
    });
    return BlockchainLatestBlockQuery2;
   }
}

async function GetBlocktime(height){
   if(height){
    // const BlockchainLatestBlockQuery3 = await getConnection(Global.network)
    // .query(
    //   "SELECT coalesce(max(bb.alter), 0) as alter FROM (SELECT EXTRACT(EPOCH FROM (timestamp - LAG(timestamp) OVER (ORDER BY timestamp))) AS alter FROM blockchain_block where height="+height+" OR height="+(height-1)+") as bb",
    // )
    // .catch(err_msg => {
    //   return(err_msg);
    // });

    const BlockchainLatestBlockQuery3 = await getConnection(Global.network)
    .query(
      "SELECT extract(epoch from timestamp  at time zone '" +process.env.TIME_ZONE+ "') AS alter FROM blockchain_block where height="+height,
    )
    .catch(err_msg => {
      return(err_msg);
    });


    return BlockchainLatestBlockQuery3;
   }
}
            
export  {latestBlockDetails};
export  {GetBlocktime};
export  {Details};