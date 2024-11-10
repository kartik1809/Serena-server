let parameters = {
  focusScore: 0,
  moodScore: 0,
  creativityScore: 0,
  productivityScore: 0,
  sentimentScore: 0,
  contentScore: 0,
  totalScore: 0,
  wellbeingScore: 0,
};

let ProductivityWeights = {
  Productive: 1,
  "Slightly Productive": 0.75,
  "Slightly Distracting": 0.5,
  Distracting: 0.25,
  Others: 0,
};

let SentimentWeights = {
  Emotional: 1,
  Horror: 0.75,
  Positive: 0.5,
  Negative: 0.25,
  Neutral: 0.5,
  Good: 0.75,
  Peaceful: 0.75,
  "Action-packed": 0.75,
  Sad: 0.25,
  Joyful: 0.75,
  Angry: 0.25,
  Excited: 0.75,
  Tense: 0.5,
  Motivated: 0.75,
  Calm: 0.75,
  Others: 0,
};

let CategoryWeights = {
  Work: 1,
  Entertainment: 0.75,
  Education: 0.75,
  "Social Media": 0.5,
  News: 0.5,
  "Health and Fitness": 0.75,
  "Personal Development": 0.75,
  Others: 0,
};

let CreativityWeights = {
  Creative: 1,
  "Non-Creative": 0.5,
  Others: 0,
};

let MoodFactorWeights = {
  Relaxed: 0.75,
  Excited: 0.75,
  Tense: 0.5,
  Sad: 0.25,
  Joyful: 0.75,
  Motivated: 0.75,
  Calm: 0.75,
  Inspired: 0.75,
  Bored: 0.25,
  Others: 0,
};

let maxScore = {
  focusScore: 0,
  moodScore: 0,
  creativityScore: 0,
  productivityScore: 0,
  sentimentScore: 0,
  contentScore: 0,
  totalScore: 0,
  wellbeingScore: 0,
};

let dayWiseScores = [
  {
    focusScore: 0,
    moodScore: 0,
    creativityScore: 0,
    productivityScore: 0,
    sentimentScore: 0,
    contentScore: 0,
    totalScore: 0,
    wellbeingScore: 0,
  },
  {
    focusScore: 0,
    moodScore: 0,
    creativityScore: 0,
    productivityScore: 0,
    sentimentScore: 0,
    contentScore: 0,
    totalScore: 0,
    wellbeingScore: 0,
  },
  {
    focusScore: 0,
    moodScore: 0,
    creativityScore: 0,
    productivityScore: 0,
    sentimentScore: 0,
    contentScore: 0,
    totalScore: 0,
    wellbeingScore: 0,
  },
  {
    focusScore: 0,
    moodScore: 0,
    creativityScore: 0,
    productivityScore: 0,
    sentimentScore: 0,
    contentScore: 0,
    totalScore: 0,
    wellbeingScore: 0,
  },
  {
    focusScore: 0,
    moodScore: 0,
    creativityScore: 0,
    productivityScore: 0,
    sentimentScore: 0,
    contentScore: 0,
    totalScore: 0,
    wellbeingScore: 0,
  },
  {
    focusScore: 0,
    moodScore: 0,
    creativityScore: 0,
    productivityScore: 0,
    sentimentScore: 0,
    contentScore: 0,
    totalScore: 0,
    wellbeingScore: 0,
  },
  {
    focusScore: 0,
    moodScore: 0,
    creativityScore: 0,
    productivityScore: 0,
    sentimentScore: 0,
    contentScore: 0,
    totalScore: 0,
    wellbeingScore: 0,
  },
];

let maxDayWiseScores = [
  {
    focusScore: 0,
    moodScore: 0,
    creativityScore: 0,
    productivityScore: 0,
    sentimentScore: 0,
    contentScore: 0,
    totalScore: 0,
    wellbeingScore: 0,
  },
  {
    focusScore: 0,
    moodScore: 0,
    creativityScore: 0,
    productivityScore: 0,
    sentimentScore: 0,
    contentScore: 0,
    totalScore: 0,
    wellbeingScore: 0,
  },
  {
    focusScore: 0,
    moodScore: 0,
    creativityScore: 0,
    productivityScore: 0,
    sentimentScore: 0,
    contentScore: 0,
    totalScore: 0,
    wellbeingScore: 0,
  },
  {
    focusScore: 0,
    moodScore: 0,
    creativityScore: 0,
    productivityScore: 0,
    sentimentScore: 0,
    contentScore: 0,
    totalScore: 0,
    wellbeingScore: 0,
  },
  {
    focusScore: 0,
    moodScore: 0,
    creativityScore: 0,
    productivityScore: 0,
    sentimentScore: 0,
    contentScore: 0,
    totalScore: 0,
    wellbeingScore: 0,
  },
  {
    focusScore: 0,
    moodScore: 0,
    creativityScore: 0,
    productivityScore: 0,
    sentimentScore: 0,
    contentScore: 0,
    totalScore: 0,
    wellbeingScore: 0,
  },
  {
    focusScore: 0,
    moodScore: 0,
    creativityScore: 0,
    productivityScore: 0,
    sentimentScore: 0,
    contentScore: 0,
    totalScore: 0,
    wellbeingScore: 0,
  },
];

function filterLast7Days(days, today = false, past = 7) {
  let currentDate = new Date();
  let pastDate = new Date();
  pastDate.setDate(currentDate.getDate() - past);

  if (today) currentDate = pastDate;

  return days.filter((day) => {
    let dayDate = new Date(day.date);
    return dayDate >= pastDate && dayDate <= currentDate;
  });
}

function getDayIndex(dayDate, currentDate = new Date()) {
  let current = new Date(currentDate);
  let targetDay = new Date(dayDate);
  let diffTime = current - targetDay;
  let diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
  return Math.abs(diffDays);
}

let AnalyzeFocusScore = (day, metrics) => {
//   parameters.focusScore +=
//     ProductivityWeights[metrics.Productivity] * day.seconds * 100 || 0;
//   maxScore.focusScore += day.seconds * 100;
//   let dayIdx = getDayIndex(day.date);
//   dayWiseScores[dayIdx].focusScore +=
//     ProductivityWeights[metrics.Productivity] * day.seconds * 100 || 0;
//   maxDayWiseScores[dayIdx].focusScore += day.seconds * 100;

    parameters.focusScore += (parameters.moodScore + parameters.sentimentScore + parameters.productivityScore) || 0;
    maxScore.focusScore += (maxScore.moodScore + maxScore.sentimentScore + maxScore.productivityScore);
    let dayIdx = getDayIndex(day.date);
    dayWiseScores[dayIdx].focusScore += (dayWiseScores[dayIdx].moodScore + dayWiseScores[dayIdx].sentimentScore + dayWiseScores[dayIdx].productivityScore) || 0;
    maxDayWiseScores[dayIdx].focusScore += (maxDayWiseScores[dayIdx].moodScore + maxDayWiseScores[dayIdx].sentimentScore + maxDayWiseScores[dayIdx].productivityScore);
};

let AnalyzeMoodScore = (day, metrics) => {
  parameters.moodScore +=
    MoodFactorWeights[metrics.MoodFactor] * day.seconds * 100 || 0;
  maxScore.moodScore += day.seconds * 100;
  let dayIdx = getDayIndex(day.date);
  dayWiseScores[dayIdx].moodScore +=
    MoodFactorWeights[metrics.MoodFactor] * day.seconds * 100 || 0;
  maxDayWiseScores[dayIdx].moodScore += day.seconds * 100;
};

let AnalyzeCreativityScore = (day, metrics) => {
  parameters.creativityScore +=
    CreativityWeights[metrics.Creativity] * day.seconds * 100 || 0;
  maxScore.creativityScore += day.seconds * 100;
  let dayIdx = getDayIndex(day.date);
  dayWiseScores[dayIdx].creativityScore +=
    CreativityWeights[metrics.Creativity] * day.seconds * 100 || 0;
  maxDayWiseScores[dayIdx].creativityScore += day.seconds * 100;
};

let AnalyzeProductivityScore = (day, metrics) => {
  parameters.productivityScore +=
    ProductivityWeights[metrics.Productivity] * day.seconds * 100 || 0;
  maxScore.productivityScore += day.seconds * 100;
  let dayIdx = getDayIndex(day.date);
  dayWiseScores[dayIdx].productivityScore +=
    ProductivityWeights[metrics.Productivity] * day.seconds * 100 || 0;
  maxDayWiseScores[dayIdx].productivityScore += day.seconds * 100;
};

let AnalyzeSentimentScore = (day, metrics) => {
  parameters.sentimentScore +=
    SentimentWeights[metrics.Sentiment] * day.seconds * 100 || 0;
  maxScore.sentimentScore += day.seconds * 100;
  let dayIdx = getDayIndex(day.date);
  dayWiseScores[dayIdx].sentimentScore +=
    SentimentWeights[metrics.Sentiment] * day.seconds * 100 || 0;
  maxDayWiseScores[dayIdx].sentimentScore += day.seconds * 100;
};

let AnalyzeContentScore = (day, metrics) => {
  parameters.contentScore +=
    CategoryWeights[metrics.Category] * day.seconds * 100 || 0;
  maxScore.contentScore += day.seconds * 100;
  let dayIdx = getDayIndex(day.date);
  dayWiseScores[dayIdx].contentScore +=
    CategoryWeights[metrics.Category] * day.seconds * 100 || 0;
  maxDayWiseScores[dayIdx].contentScore += day.seconds * 100;
};

let AnalyzeTotalScore = (day, metrics) => {
  parameters.totalScore +=
    parameters.focusScore +
    parameters.moodScore +
    parameters.creativityScore +
    parameters.productivityScore +
    parameters.sentimentScore +
    parameters.contentScore;
  maxScore.totalScore +=
    maxScore.focusScore +
    maxScore.moodScore +
    maxScore.creativityScore +
    maxScore.productivityScore +
    maxScore.sentimentScore +
    maxScore.contentScore;
  let dayIdx = getDayIndex(day.date);
  dayWiseScores[dayIdx].totalScore +=
    dayWiseScores[dayIdx].focusScore +
    dayWiseScores[dayIdx].moodScore +
    dayWiseScores[dayIdx].creativityScore +
    dayWiseScores[dayIdx].productivityScore +
    dayWiseScores[dayIdx].sentimentScore +
    dayWiseScores[dayIdx].contentScore;
  maxDayWiseScores[dayIdx].totalScore +=
    maxDayWiseScores[dayIdx].focusScore +
    maxDayWiseScores[dayIdx].moodScore +
    maxDayWiseScores[dayIdx].creativityScore +
    maxDayWiseScores[dayIdx].productivityScore +
    maxDayWiseScores[dayIdx].sentimentScore +
    maxDayWiseScores[dayIdx].contentScore;
};

let AnalyzeWellbeingScore = (day, metrics) => {
  parameters.wellbeingScore +=
    parameters.moodScore + parameters.sentimentScore || 0;
  maxScore.wellbeingScore += maxScore.moodScore + maxScore.sentimentScore;
  let dayIdx = getDayIndex(day.date);
  dayWiseScores[dayIdx].wellbeingScore +=
    dayWiseScores[dayIdx].moodScore + dayWiseScores[dayIdx].sentimentScore;
  maxDayWiseScores[dayIdx].wellbeingScore +=
    maxDayWiseScores[dayIdx].moodScore +
    maxDayWiseScores[dayIdx].sentimentScore;
};

let categoryData = {
  Work: 0,
  Entertainment: 0,
  Education: 0,
  "Social Media": 0,
  News: 0,
  "Health and Fitness": 0,
  "Personal Development": 0,
  Others: 0,
  Finance: 0,
};

let visitedDomains = {};
let allTime = 0;

let analyzeDomains = (domains) => {
  domains.map((domain) => {
    let responseByGEMINI = domain.category;
    let days = filterLast7Days(domain.days);
    let metrics = JSON.parse(
      responseByGEMINI.slice(7, responseByGEMINI.length - 3)
    );
    visitedDomains[domain.name] = domain.allTime;
    allTime += domain.allTime.seconds;
    categoryData[metrics.Category] += 1;
    days.map((day) => {
      AnalyzeFocusScore(day, metrics);
      AnalyzeMoodScore(day, metrics);
      AnalyzeCreativityScore(day, metrics);
      AnalyzeProductivityScore(day, metrics);
      AnalyzeSentimentScore(day, metrics);
      AnalyzeContentScore(day, metrics);
      AnalyzeTotalScore(day, metrics);
      AnalyzeWellbeingScore(day, metrics);
    });
  });
};

let analyzeContent = (content) => {
  content.map((entry) => {
    let responseByGEMINI = entry.category;
    let metrics = JSON.parse(
      responseByGEMINI.slice(7, responseByGEMINI.length - 3)
    );
    parameters.focusScore +=
      ProductivityWeights[metrics.Productivity] * 100 || 0;
    parameters.moodScore += MoodFactorWeights[metrics.MoodFactor] * 100 || 0;
    parameters.creativityScore +=
      CreativityWeights[metrics.Creativity] * 100 || 0;
    parameters.productivityScore +=
      ProductivityWeights[metrics.Productivity] * 100 || 0;
    parameters.sentimentScore += SentimentWeights[metrics.Sentiment] * 100 || 0;
    parameters.contentScore += CategoryWeights[metrics.Category] * 100 || 0;
    parameters.wellbeingScore +=
      MoodFactorWeights[metrics.MoodFactor] +
        SentimentWeights[metrics.Sentiment] || 0;
    parameters.totalScore +=
      (parameters.focusScore +
        parameters.moodScore +
        parameters.creativityScore +
        parameters.productivityScore +
        parameters.sentimentScore +
        parameters.contentScore) /
      6;
  });
};

const refreshScores = () => {
  parameters = {
    focusScore: 0,
    moodScore: 0,
    creativityScore: 0,
    productivityScore: 0,
    sentimentScore: 0,
    contentScore: 0,
    totalScore: 0,
    wellbeingScore: 0,
  };

  maxScore = {
    focusScore: 0,
    moodScore: 0,
    creativityScore: 0,
    productivityScore: 0,
    sentimentScore: 0,
    contentScore: 0,
    totalScore: 0,
    wellbeingScore: 0,
  };

    dayWiseScores = [
    {
        focusScore: 0,
        moodScore: 0,
        creativityScore: 0,
        productivityScore: 0,
        sentimentScore: 0,
        contentScore: 0,
        totalScore: 0,
        wellbeingScore: 0,
    },
    {
        focusScore: 0,
        moodScore: 0,
        creativityScore: 0,
        productivityScore: 0,
        sentimentScore: 0,
        contentScore: 0,
        totalScore: 0,
        wellbeingScore: 0,
    },
    {
        focusScore: 0,
        moodScore: 0,
        creativityScore: 0,
        productivityScore: 0,
        sentimentScore: 0,
        contentScore: 0,
        totalScore: 0,
        wellbeingScore: 0,
    },
    {
        focusScore: 0,
        moodScore: 0,
        creativityScore: 0,
        productivityScore: 0,
        sentimentScore: 0,
        contentScore: 0,
        totalScore: 0,
        wellbeingScore: 0,
    },
    {
        focusScore: 0,
        moodScore: 0,
        creativityScore: 0,
        productivityScore: 0,
        sentimentScore: 0,
        contentScore: 0,
        totalScore: 0,
        wellbeingScore: 0,
    },
    {
        focusScore: 0,
        moodScore: 0,
        creativityScore: 0,
        productivityScore: 0,
        sentimentScore: 0,
        contentScore: 0,
        totalScore: 0,
        wellbeingScore: 0,
    },
    {
        focusScore: 0,
        moodScore: 0,
        creativityScore: 0,
        productivityScore: 0,
        sentimentScore: 0,
        contentScore: 0,
        totalScore: 0,
        wellbeingScore: 0,
    },
    ];

    maxDayWiseScores = [
    {
        focusScore: 0,
        moodScore: 0,
        creativityScore: 0,
        productivityScore: 0,
        sentimentScore: 0,
        contentScore: 0,
        totalScore: 0,
        wellbeingScore: 0,
    },
    {
        focusScore: 0,
        moodScore: 0,
        creativityScore: 0,
        productivityScore: 0,
        sentimentScore: 0,
        contentScore: 0,
        totalScore: 0,
        wellbeingScore: 0,
    },
    {
        focusScore: 0,
        moodScore: 0,
        creativityScore: 0,
        productivityScore: 0,
        sentimentScore: 0,
        contentScore: 0,
        totalScore: 0,
        wellbeingScore: 0,
    },
    {
        focusScore: 0,
        moodScore: 0,
        creativityScore: 0,
        productivityScore: 0,
        sentimentScore: 0,
        contentScore: 0,
        totalScore: 0,
        wellbeingScore: 0,
    },
    {
        focusScore: 0,
        moodScore: 0,
        creativityScore: 0,
        productivityScore: 0,
        sentimentScore: 0,
        contentScore: 0,
        totalScore: 0,
        wellbeingScore: 0,
    },
    {
        focusScore: 0,
        moodScore: 0,
        creativityScore: 0,
        productivityScore: 0,
        sentimentScore: 0,
        contentScore: 0,
        totalScore: 0,
        wellbeingScore: 0,
    },
    {
        focusScore: 0,
        moodScore: 0,
        creativityScore: 0,
        productivityScore: 0,
        sentimentScore: 0,
        contentScore: 0,
        totalScore: 0,
        wellbeingScore: 0,
    },
    ];

};

export let AnalyzeScores = (userDomain, userContent) => {
  let domains = userDomain.domains;
  let content = userContent.entries;
  refreshScores();
  analyzeDomains(domains);
  analyzeContent(content);
  parameters.focusScore = (parameters.focusScore / maxScore.focusScore) * 100;
  parameters.moodScore = (parameters.moodScore / maxScore.moodScore) * 100;
  parameters.creativityScore =
    (parameters.creativityScore / maxScore.creativityScore) * 100;
  parameters.productivityScore =
    (parameters.productivityScore / maxScore.productivityScore) * 100;
  parameters.sentimentScore =
    (parameters.sentimentScore / maxScore.sentimentScore) * 100;
  parameters.contentScore =
    (parameters.contentScore / maxScore.contentScore) * 100;
  parameters.totalScore = (parameters.totalScore / maxScore.totalScore) * 100;
  parameters.wellbeingScore =
    (parameters.wellbeingScore / maxScore.wellbeingScore) * 100;
  dayWiseScores.map((day, index) => {
    day.focusScore =
      (day.focusScore / maxDayWiseScores[index].focusScore) * 100;
    day.moodScore = (day.moodScore / maxDayWiseScores[index].moodScore) * 100;
    day.creativityScore =
      (day.creativityScore / maxDayWiseScores[index].creativityScore) * 100;
    day.productivityScore =
      (day.productivityScore / maxDayWiseScores[index].productivityScore) * 100;
    day.sentimentScore =
      (day.sentimentScore / maxDayWiseScores[index].sentimentScore) * 100;
    day.contentScore =
      (day.contentScore / maxDayWiseScores[index].contentScore) * 100;
    day.totalScore =
      (day.totalScore / maxDayWiseScores[index].totalScore) * 100;
    day.wellbeingScore =
      (day.wellbeingScore / maxDayWiseScores[index].wellbeingScore) * 100;
  });
  return {
    overallScores: parameters,
    dayWiseScores: dayWiseScores,
    categoryData: categoryData,
    visitedDomains: visitedDomains,
    allTime: allTime,
  };
};
