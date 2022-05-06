## Milestone 1

### 1 Problematic

#### 1.1 Overview & Motivation

In the 21st century, movies have become an essential part of everyone's life all over the world. We watch movies for excitement and fun, and they are one of our most popular forms of entertainment. As society changed, so did the movies. Movies have advanced rapidly since the 21st century, and digital technology is the driving force behind change. For instance, digital 3D projection has largely replaced earlier complicated 3D film systems and has grown in popularity since the early 2010s. So, we choose to study the films from 2000 to 2020 to be more informative.

Besides, IMDb is an online database that stores information related to more than 6 million titles, of which almost 500,000 are featured films. Different people have different preferences for movies. So, the IMDb provides a rating scale that allows users to rate films according to their preferences on a scale of one to ten, and these submitted votes will be filtered and weighted by IMDb to produce a weighted average for each movie. 

However, only including movies from 2000 to 2020, there are 5487 films with attributes in the database. So it is complicated for the audience to search for movies information without a good visualization. Therefore, we believe that by examining the characteristics of the most popular movies from 2000 to 2020, we can uncover some unexpected results and simplify the search for a good movie.


#### 1.2 Our goal & target audience

What determines a movie's rating? ----We are trying to simply show the complex relationships with our visualization, which exist between the votes and some influential factors ---- duration, language, casted actors, and so on. Besides, we also try to explore whether there is a relationship between the votes and income & budget. Our visualization can give you a general overview of votes and their influential factors.

If you're not sure what videos to watch, it's easier to browse by category and select a movie based on votes. If you just want to find a film to pass the time, you can just visit our website and scroll through the votes from high to low.
You can select movies by country language and see how the country affects overall ratings. Apart from that, you will be blown away by the opportunity to choose a good movie by the relationships between the votes and the influential factors, such as its incomes & budget or the casted actors.




### 2 Dataset

#### 2.1 Dataset introduction

This project is based on dataset [IMDb Movies dataset from 2000 - 2020](https://www.kaggle.com/datasets/chenyanglim/imdb-v2/code) updated by CHEN YANG LIM, which containing 5,487 movies with their published dates, budgets, country, language, etc. All data are contained in one csv file [IMDB_Movies_2000_2020.csv](https://github.com/com-480-data-visualization/datavis-project-2022-bcd/blob/main/data/IMDB_Movies_2000_2020.csv) which consists of 5487 rows and  24 columns. Each row represents an instance of movies and columns show their attributes: 'imdb_title_id', 'title', 'original_title', 'year', 'date_published', 'genre', 'duration', 'country', 'language_1', 'language_2', 'language_3', 'director', 'writer', 'actors', 'actors_1', 'actors_f2', 'description', 'desc35', 'avg_vote', 'votes', 'budget', 'usa_gross_income', 'worlwide_gross_income', 'reviews_from_users'. Data are mostly clean and provided in String format. 

#### 2.2 Data pre-processing

* We noticed that 'budget' and  'worlwide_gross_income' columns involve different currencies and we have utilized [Currency Converter](https://pypi.org/project/CurrencyConverter/) package to unify the currencies into USA dollars based the exchange rate on 31-03-2021. We removed data which were not supported by the converter and those without real-time exchange rates.
* Since column 'country' lists all participated country in one string, we have split them and made a separate count for each country. Column 'actors' are processed in a similar way.
* We have combined 'language_1', 'language_2', 'language_3' to count in the aggregate for each language, ignoring the difference between original language and the translated versions.
* We have casted numbers in the form from 'str' into 'int' or 'float' type to facilitate later analysis and visualization. 

#### 2.3 Exploratory Data Analysis

Please check out content here: [Data analysis](https://github.com/com-480-data-visualization/datavis-project-2022-bcd/blob/main/data/Data_Visualization_M1.ipynb)




### 3 Related work

* What others have already done with the data?

  We have read the codes of this dataset and similar data related to movies on Kaggle and found out that most people are programming [Contents based recommender](https://www.kaggle.com/code/chenyanglim/content-based-recommender) using those datasets as inputs. 

* Why is your approach original?

  We have checked previous projects of COM-480 and only found one group visualizing similar data relevant to movies,  and details can be checked [here](). They had done the work based on [TMDB 5000 Movie Dataset](https://www.kaggle.com/datasets/tmdb/tmdb-movie-metadata), which is a minimized version of movie data provided by Kaggle. Since their website has already expired, we have watched their demo video. Their project was  focused on the genre and actors of movies, while ours will mainly concentrate on average votes, budget and income, which means our websites will be more likely to suit investors and audience looking for movies with high votes and high box office return. 

* What source of inspiration do you take? Visualizations that you found on other websites or magazines (might be unrelated to your data).

  We did acquire some inspirations from the websites exhibited in this course, such as [DuelingData-The Beatles](http://duelingdata.blogspot.com/2016/01/the-beatles.html), which is concise but informative as well. We would also like to set up a website as interactive and attractive as that one. And we prefer to let visitors gain a direct intuition and get a better understanding of the data, like the one [Facebook Map](https://www.facebook.com/notes/10158791468612200/) could do. 
