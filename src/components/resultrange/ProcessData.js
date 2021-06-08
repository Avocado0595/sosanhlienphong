class ProcessData {
  getMedian = function (arr) {
    arr.sort((a, b) => a - b);
    let mid = arr.length / 2;
    if (mid === Math.round(mid)) {
      return (arr[Math.round(mid) - 1] + arr[Math.round(mid)]) / 2;
    } else {
      return arr[Math.round(mid) - 1];
    }
  };

  absDiff = function (arr, avg) {
    let result = [];
    arr.forEach((item) => {
      result.push(Math.abs(item - avg));
    });
    return result;
  };

  getStd = function (arr, avg) {
    let absdiffArr = this.absDiff(arr, avg);
    let sumSqr = 0;
    absdiffArr.forEach((item) => {
      sumSqr += item * item;
    });
    return 1.134 * Math.sqrt(sumSqr / (arr.length - 1));
  };
  //calc final result
  calc = function (data) {
    let static_data = [];
    let avg = this.getMedian(data);
    let absdiff = this.absDiff(data, avg);
    let rsd = this.getMedian(absdiff) * 1.483;
    let rsd_collection = [rsd];
    let avg_collection = [avg];
    let stop = false;

    while (!stop) {
      //calc delta
      let delta = 1.5 * rsd;
      let newdata = [];
      //update data
      data.forEach((item) => {
        if (item < avg - delta) {
          newdata.push(avg - delta);
        } else if (item > avg + delta) {
          newdata.push(avg + delta);
        } else {
          newdata.push(item);
        }
      });
      static_data.push(newdata);
      let sumNewdata = 0;
      newdata.forEach((item) => {
        sumNewdata += item;
      });
      avg = sumNewdata / newdata.length;
      rsd = this.getStd(newdata, avg);
      rsd_collection.push(rsd);
      avg_collection.push(avg);
      if (
        Math.abs(
          rsd_collection[rsd_collection.length - 1] -
            rsd_collection[rsd_collection.length - 2]
        ) < 0.001 &&
        Math.abs(
          avg_collection[avg_collection.length - 1] -
            avg_collection[avg_collection.length - 2]
        ) < 0.001
      ) {
        stop = true;
      }
    }

    return { avg: avg_collection[1], rsd: rsd_collection[1] };
  };
}

export default ProcessData;
