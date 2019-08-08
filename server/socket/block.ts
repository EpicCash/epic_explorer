import { getConnection } from "typeorm";
var moment = require("moment");
moment.updateLocale('en', {
  relativeTime: {
       future: "in %s",
       past:   "%s ago",
       s:  "seconds",
       m:  "1 minute",
       mm: "%d minutes",
       h:  "1 hour",
       hh: "%d hours",
       d:  "1 day",
       dd: "%d days",
       M:  "1 month",
       MM: "%d months",
       y:  "1 year",
       yy: "%d years"
 }
});

export async function universalGetLatestBlockDetails(socket) {

  let block_height = "",
    letest_block = "",
    letest_block_num = "",
    letest_block_duration = "";

  const BlockchainLatestBlockQuery = await getConnection().query(
    "SELECT bb.timestamp,bb.proof,bb.height,bb.edge_bits,bb.hash,bb.secondary_scaling, bb.previous_id, bb.total_difficulty_cuckaroo, bb.total_difficulty_cuckatoo, bb.total_difficulty_progpow, bb.total_difficulty_randomx, COUNT(DISTINCT(bi.block_id)) AS input_count, COUNT(DISTINCT(bk.block_id)) AS kernel_count, COUNT(DISTINCT(bo.block_id)) AS output_count FROM blockchain_block bb LEFT JOIN blockchain_input bi ON bi.block_id = bb.hash LEFT JOIN blockchain_kernel bk ON bk.block_id = bb.hash LEFT JOIN blockchain_output bo ON bo.block_id = bb.hash group by bb.hash, bb.timestamp ORDER BY bb.timestamp DESC LIMIT 1");
  const BlockchainPreviousBlockQuery = await getConnection().query(
    "SELECT total_difficulty_cuckaroo, total_difficulty_cuckatoo, total_difficulty_progpow, total_difficulty_randomx FROM blockchain_block WHERE hash=" +
      "'" +
      BlockchainLatestBlockQuery[0].previous_id +
      "'"
  );
  let height = BlockchainLatestBlockQuery[0].height;

  if (height > 12960) {
    var remain_block = height - 12960;
    var coin_existence =
      1440 * 200 +
      1440 * 180 +
      1440 * 160 +
      1440 * 140 +
      1440 * 120 +
      1440 * 100 +
      1440 * 80 +
      1440 * 60 +
      1440 * 50 +
      25 * remain_block;
  } else if (height > 11520) {
    var remain_block = height - 11520;
    var coin_existence =
      1440 * 200 +
      1440 * 180 +
      1440 * 160 +
      1440 * 140 +
      1440 * 120 +
      1440 * 100 +
      1440 * 80 +
      1440 * 60 +
      remain_block * 50;
  } else if (height > 10080) {
    var remain_block = height - 10080;
    var coin_existence =
      1440 * 200 +
      1440 * 180 +
      1440 * 160 +
      1440 * 140 +
      1440 * 120 +
      1440 * 100 +
      1440 * 80 +
      remain_block * 60;
  } else if (height > 8640) {
    var remain_block = height - 8640;
    var coin_existence =
      1440 * 200 +
      1440 * 180 +
      1440 * 160 +
      1440 * 140 +
      1440 * 120 +
      1440 * 100 +
      remain_block * 80;
  } else if (height > 7200) {
    var remain_block = height - 7200;
    var coin_existence =
      1440 * 200 +
      1440 * 180 +
      1440 * 160 +
      1440 * 140 +
      1440 * 120 +
      remain_block * 100;
  } else if (height > 5760) {
    var remain_block = height - 5760;
    var coin_existence =
      1440 * 200 + 1440 * 180 + 1440 * 160 + 1440 * 140 + remain_block * 120;
  } else if (height > 4320) {
    var remain_block = height - 4320;
    var coin_existence =
      1440 * 200 + 1440 * 180 + 1440 * 160 + remain_block * 140;
  } else if (height > 2880) {
    var remain_block = height - 2880;
    var coin_existence = 1440 * 200 + 1440 * 180 + remain_block * 160;
  } else if (height > 1440) {
    var remain_block = height - 1440;
    var coin_existence = 1440 * 200 + remain_block * 180;
  } else {
    var coin_existence = height * 200;
  }

  letest_block = moment(BlockchainLatestBlockQuery[0].timestamp).fromNow();
  letest_block_num = letest_block.substr(0, letest_block.indexOf(" ")); // "72"
  letest_block_duration = letest_block.substr(letest_block.indexOf(" ") + 1); // "tocirah sneab"
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

  if(BlockchainLatestBlockQuery[0].proof == "RandomX"){
   var Difficulty = targetdifficultyrandomx;
  }else if(BlockchainLatestBlockQuery[0].proof == "ProgPow"){
    var Difficulty = targetdifficultyprogpow;
  }else if(BlockchainLatestBlockQuery[0].proof == "Cuckoo" ){
    var Difficulty = targetdifficultycuckatoo;
  }

  block_height = BlockchainLatestBlockQuery[0].height;

  var current_date = new Date();
  // var current_date = new Date("Sat Apr 2 2018 15:04:00 GMT+0530 (IST)");

  var enddaydif =
    Math.abs(
      BlockchainLatestBlockQuery[0].timestamp.getTime() -
        current_date.getTime(),
    ) /
    (1000 * 60 * 60 * 24);
  var enddayrnd = Math.round(enddaydif);
  // if(enddayrnd < 1) {
  var millseconds = Math.abs(
    BlockchainLatestBlockQuery[0].timestamp.getTime() -
      current_date.getTime(),
  );

  var seconds = Math.floor(millseconds / 1000);
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

  var TotalCuckoo =
    parseInt(BlockchainLatestBlockQuery[0].total_difficulty_cuckatoo) +
    parseInt(BlockchainLatestBlockQuery[0].total_difficulty_cuckaroo);
    let balance = BlockchainLatestBlockQuery[0].hash.substring(2, 62);
    let arr = balance.match(/.{1,6}/g);
    var hasharray = arr.map(i => '#' + i);

  socket.emit("latestblockdetail", {
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
    age : dateTimeDurationString,
    input_count: BlockchainLatestBlockQuery[0].input_count,
    kernel_count: BlockchainLatestBlockQuery[0].kernel_count,
    output_count: BlockchainLatestBlockQuery[0].output_count,
    proof: BlockchainLatestBlockQuery[0].proof,
    hasharray: hasharray,
    Difficulty: Difficulty,
    hashstart:BlockchainLatestBlockQuery[0].hash.slice(0, 2),
    hashend:BlockchainLatestBlockQuery[0].hash.slice(62,64),
    TotalDifficultyCuckaroo:
      BlockchainLatestBlockQuery[0].total_difficulty_cuckaroo,
    TotalDifficultyCuckatoo:
      BlockchainLatestBlockQuery[0].total_difficulty_cuckatoo,
    TotalDifficultyProgpow:
      BlockchainLatestBlockQuery[0].total_difficulty_progpow,
    TotalDifficultyRandomx:
      BlockchainLatestBlockQuery[0].total_difficulty_randomx
  });
}
