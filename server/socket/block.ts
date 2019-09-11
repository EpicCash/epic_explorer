import { getConnection } from "typeorm";
import { Global } from "../global";
import {
  BlockchainBlock,
} from '../entities';
var moment = require("moment");
moment.updateLocale('en', {
  relativeTime: {
    future: "in %s",
    past: "%s ago",
    s: "seconds",
    m: "1 minute",
    mm: "%d minutes",
    h: "1 hour",
    hh: "%d hours",
    d: "1 day",
    dd: "%d days",
    M: "1 month",
    MM: "%d months",
    y: "1 year",
    yy: "%d years"
  }
});

function dateDiff(date2, insec = false) {
  var current_date = new Date();
  // var current_date = new Date("Sat Apr 2 2018 15:04:00 GMT+0530 (IST)");

  var enddaydif =
    Math.abs(date2.getTime() - current_date.getTime()) /
    (1000 * 60 * 60 * 24);
  var enddayrnd = Math.round(enddaydif);
  // if(enddayrnd < 1) {
  var time = convertMinsToHrmin(
    Math.abs(date2.getTime() - current_date.getTime()), insec
  );
  return time;
  // } else if(enddayrnd == 1) {
  //   return 'Ends in ' + enddayrnd + ' day';
  // }else {
  //   return 'Ends in ' + enddayrnd + ' days';
  // }
}


function convertMinsToHrmin(millseconds, insec) {
  var seconds = Math.floor(millseconds / 1000);
  if (insec) {
    let sec = Math.floor(millseconds / 1000);
    return sec;
  }
  //console.log('secnds djfhksjdfdsf',seconds);
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


export async function universalGetLatestBlockDetails(current_network) {
 

  let key =  process.env.REDIS_KEY + current_network + 'Latest_Block_details'

  let block_height = "",
    letest_block,
    letest_block_num = "",
    letest_block_duration = "";


  const BlockchainLatestBlockQuery = await getConnection(current_network).query(
    "SELECT bb.timestamp,bb.proof,bb.height,bb.edge_bits,bb.hash,bb.secondary_scaling, bb.previous_id, bb.total_difficulty_cuckaroo, bb.total_difficulty_cuckatoo, bb.total_difficulty_progpow, bb.total_difficulty_randomx, COUNT(DISTINCT(bi.block_id)) AS input_count, COUNT(DISTINCT(bk.block_id)) AS kernel_count, COUNT(DISTINCT(bo.block_id)) AS output_count FROM blockchain_block bb LEFT JOIN blockchain_input bi ON bi.block_id = bb.hash LEFT JOIN blockchain_kernel bk ON bk.block_id = bb.hash LEFT JOIN blockchain_output bo ON bo.block_id = bb.hash group by bb.hash, bb.timestamp ORDER BY bb.timestamp DESC LIMIT 1");
  const BlockchainPreviousBlockQuery = await getConnection(current_network).query(
    "SELECT total_difficulty_cuckaroo, total_difficulty_cuckatoo, total_difficulty_progpow, total_difficulty_randomx FROM blockchain_block WHERE hash=" +
    "'" +
    BlockchainLatestBlockQuery[0].previous_id +
    "'"
  );
              //console.log(BlockchainPreviousBlockQuery);
          let height = BlockchainLatestBlockQuery[0].height;

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
          //     1440 * 200 + 1440 * 180 + 1440 * 160 + 1440 * 140 + remain_block * 120;
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
          var coin_existence;
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
          /// Compute the total reward generated by each block in a given height.
            if (height <= BLOCK_ERA_1) {
              coin_existence =  height * 16;
            } else if (height <= BLOCK_ERA_2) {
              remaining_height = height - BLOCK_ERA_1;
              coin_existence =  (16 * BLOCK_ERA_1) + 8 * remaining_height;
            } else if (height <= BLOCK_ERA_3) {
              remaining_height = height - BLOCK_ERA_2;
              coin_existence =  (16 * BLOCK_ERA_1) + (8 * BLOCK_ERA_2) + 4 * remaining_height;
            } else if (height <= BLOCK_ERA_4) {
              remaining_height = height - BLOCK_ERA_3;
              coin_existence =  (16 * BLOCK_ERA_1) + (8 * BLOCK_ERA_2) + (4 * BLOCK_ERA_3) + 2 * remaining_height;
            } else if (height <= BLOCK_ERA_5) {
              remaining_height = height - BLOCK_ERA_4;
              coin_existence =  (16 * BLOCK_ERA_1) + (8 * BLOCK_ERA_2) + (4 * BLOCK_ERA_3) + (2 * BLOCK_ERA_4) +1 * remaining_height; 
            } else {
              // After the era 6, we reduce the block rewards by half each 1460 days.
              // Minus 1 to include multiples in the same index
              // (i.e changes greater than to greater or equals to)
              
              let preious_circulation = (16 * BLOCK_ERA_1) + (8 * BLOCK_ERA_2) + (4 * BLOCK_ERA_3) + (2 * BLOCK_ERA_4) + (1 * BLOCK_ERA_5);
          
              let height_with_offset = height - (BLOCK_ERA_5 - 1);
              let exp = height_with_offset / BLOCK_ERA_6_ONWARDS;
              let reward_emission =  BASE_REWARD_ERA_6_ONWARDS / (1 << exp);
              coin_existence = preious_circulation + reward_emission ;
            }
        
          letest_block = dateDiff(BlockchainLatestBlockQuery[0].timestamp, true);
          letest_block_num = letest_block // "72"
          letest_block_duration = letest_block == 1 ? 'second ago' : 'seconds ago'; // "tocirah sneab"
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
        
          if (BlockchainLatestBlockQuery[0].proof == "RandomX") {
            var Difficulty = targetdifficultyrandomx;
          } else if (BlockchainLatestBlockQuery[0].proof == "ProgPow") {
            var Difficulty = targetdifficultyprogpow;
          } else if (BlockchainLatestBlockQuery[0].proof == "Cuckoo") {
            var Difficulty = targetdifficultycuckatoo;
          }
        
          block_height = BlockchainLatestBlockQuery[0].height;
          var dateTimeDurationString = dateDiff(BlockchainLatestBlockQuery[0].timestamp, false);
        
          var TotalCuckoo =
            parseInt(BlockchainLatestBlockQuery[0].total_difficulty_cuckatoo) +
            parseInt(BlockchainLatestBlockQuery[0].total_difficulty_cuckaroo);
          let balance = BlockchainLatestBlockQuery[0].hash.substring(2, 62);
          let arr = balance.match(/.{1,6}/g);
          var hasharray = arr.map(i => '#' + i);
        
         var final_result = {
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
            age: dateTimeDurationString,
            input_count: BlockchainLatestBlockQuery[0].input_count,
            kernel_count: BlockchainLatestBlockQuery[0].kernel_count,
            output_count: BlockchainLatestBlockQuery[0].output_count,
            hash: BlockchainLatestBlockQuery[0].hash,
            proof: BlockchainLatestBlockQuery[0].proof,
            hasharray: hasharray,
            Difficulty: Difficulty,
            hashstart: BlockchainLatestBlockQuery[0].hash.slice(0, 2),
            hashend: BlockchainLatestBlockQuery[0].hash.slice(62, 64),
            TotalDifficultyCuckaroo:
              BlockchainLatestBlockQuery[0].total_difficulty_cuckaroo,
            TotalDifficultyCuckatoo:
              BlockchainLatestBlockQuery[0].total_difficulty_cuckatoo,
            TotalDifficultyProgpow:
              BlockchainLatestBlockQuery[0].total_difficulty_progpow,
            TotalDifficultyRandomx:
              BlockchainLatestBlockQuery[0].total_difficulty_randomx
          }


          const BlockchainBlockPaginationQuery = await getConnection(current_network).getRepository(
            BlockchainBlock,
          )
            .createQueryBuilder('blockchain_block')
            .select([
              'blockchain_block.Hash',
              'blockchain_block.Timestamp',
              '(blockchain_block.TotalDifficultyCuckaroo + blockchain_block.TotalDifficultyCuckatoo) as TotalCuckoo',
              'blockchain_block.TotalDifficultyCuckaroo',
              'blockchain_block.TotalDifficultyCuckatoo',
              'blockchain_block.TotalDifficultyProgpow',
              'blockchain_block.TotalDifficultyRandomx',
              'blockchain_block.previous_id',
              'EXTRACT(EPOCH FROM (blockchain_block.timestamp - LAG(blockchain_block.timestamp) OVER (ORDER BY blockchain_block.timestamp))) as timetaken',
              'blockchain_block.total_difficulty_cuckaroo - LAG(blockchain_block.total_difficulty_cuckaroo) OVER (ORDER BY blockchain_block.total_difficulty_cuckaroo) AS target_difficulty_cuckaroo',
              'blockchain_block.total_difficulty_cuckatoo - LAG(blockchain_block.total_difficulty_cuckatoo) OVER (ORDER BY blockchain_block.total_difficulty_cuckatoo) AS target_difficulty_cuckatoo',
              'blockchain_block.total_difficulty_progpow - LAG(blockchain_block.total_difficulty_progpow) OVER (ORDER BY blockchain_block.total_difficulty_progpow) AS target_difficulty_progpow',
              'blockchain_block.total_difficulty_randomx - LAG(blockchain_block.total_difficulty_randomx) OVER (ORDER BY blockchain_block.total_difficulty_randomx) AS target_difficulty_randomx',
              'blockchain_block.Height',
              'blockchain_block.EdgeBits',
              'COUNT(DISTINCT(blockchain_input.block_id)) AS input_count',
              'COUNT(DISTINCT(blockchain_kernel.block_id)) AS kernal_count',
              'COUNT(DISTINCT(blockchain_output.block_id)) AS output_count',
              'blockchain_block.Proof As PoWAlgo',
            ])
            .leftJoin('blockchain_block.BlockchainInputs', 'blockchain_input')
            .leftJoin('blockchain_block.BlockchainKernels', 'blockchain_kernel')
            .leftJoin('blockchain_block.BlockchainOutputs', 'blockchain_output')
            .skip(0)
            .take(20)
            .orderBy('blockchain_block.Timestamp', 'DESC')
            .groupBy('blockchain_block.Hash')
            .getRawAndEntities();

          //console.log(BlockchainBlockPaginationQuery.raw);

          let BlockchainBlockResult = BlockchainBlockPaginationQuery.raw;
          let lastElemt =
            BlockchainBlockResult[BlockchainBlockResult.length - 1];
          const BlockchainPreviousBlockFetchQuery = await getConnection(Global.network).getRepository(
            BlockchainBlock,
          ).findOne({
            select: ['TotalDifficultyCuckaroo', 'TotalDifficultyCuckatoo', 'TotalDifficultyProgpow', 'TotalDifficultyRandomx'],
            where: { Hash: lastElemt.previous_id },
          });

          BlockchainBlockResult[BlockchainBlockResult.length - 1][
            'target_difficulty_cuckaroo'
          ] = BlockchainPreviousBlockFetchQuery &&
            BlockchainPreviousBlockFetchQuery != undefined ?
              (parseInt(lastElemt.blockchain_block_total_difficulty_cuckaroo)
                ? parseInt(lastElemt.blockchain_block_total_difficulty_cuckaroo)
                : 0) -
              (parseInt(BlockchainPreviousBlockFetchQuery.TotalDifficultyCuckaroo) ? parseInt(BlockchainPreviousBlockFetchQuery.TotalDifficultyCuckaroo) : 0)
              : 0;

          BlockchainBlockResult[BlockchainBlockResult.length - 1][
            'target_difficulty_cuckatoo'
          ] = BlockchainPreviousBlockFetchQuery &&
            BlockchainPreviousBlockFetchQuery != undefined ?
              (parseInt(lastElemt.blockchain_block_total_difficulty_cuckatoo)
                ? parseInt(lastElemt.blockchain_block_total_difficulty_cuckatoo)
                : 0) -
              (parseInt(BlockchainPreviousBlockFetchQuery.TotalDifficultyCuckatoo) ? parseInt(BlockchainPreviousBlockFetchQuery.TotalDifficultyCuckatoo) : 0)
              : 0;

          BlockchainBlockResult[BlockchainBlockResult.length - 1][
            'target_difficulty_progpow'
          ] = BlockchainPreviousBlockFetchQuery &&
            BlockchainPreviousBlockFetchQuery != undefined ?
              (parseInt(lastElemt.blockchain_block_total_difficulty_progpow)
                ? parseInt(lastElemt.blockchain_block_total_difficulty_progpow)
                : 0) -
              (parseInt(BlockchainPreviousBlockFetchQuery.TotalDifficultyProgpow) ? parseInt(BlockchainPreviousBlockFetchQuery.TotalDifficultyProgpow) : 0)
              : 0;

          BlockchainBlockResult[BlockchainBlockResult.length - 1][
            'target_difficulty_randomx'
          ] = BlockchainPreviousBlockFetchQuery &&
            BlockchainPreviousBlockFetchQuery != undefined ?
              (parseInt(lastElemt.blockchain_block_total_difficulty_randomx)
                ? parseInt(lastElemt.blockchain_block_total_difficulty_randomx)
                : 0) -
              (parseInt(BlockchainPreviousBlockFetchQuery.TotalDifficultyRandomx) ? parseInt(BlockchainPreviousBlockFetchQuery.TotalDifficultyRandomx) : 0)
              : 0;

          BlockchainBlockResult.forEach(e => {
            var latest_block = dateDiff(e.blockchain_block_timestamp);
            e['hashstart'] = e.blockchain_block_hash.slice(0, 2);
            e['hashend'] = e.blockchain_block_hash.slice(62, 64);
            let balance = e.blockchain_block_hash.substring(2, 62);
            let arr = balance.match(/.{1,6}/g);
            e['hasharray'] = arr.map(i => '#' + i);
            e['age'] = latest_block;
          });

          //console.log(BlockchainBlockResult);

          final_result['BlockchainBlockResult']= BlockchainBlockResult;
          Global.client.set(key, JSON.stringify(final_result), 'EX', parseInt(process.env.REDIS_EXPIRY), function(err){
            //client.set(key, JSON.stringify(body));
            });

    //console.log(final_result);
        
}
