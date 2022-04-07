## Milestone 1

### 1 Problematic

In the 21st century, movies have become an important part of everyone’s life all over the world. We watch movies for the sake of excitement and fun, and they are one of our most popular forms of entertainment. Different people have different preferences for movies. So, the IMDb provides a rating scale that allows users to rate films according to their preferences on a scale of one to ten, and these submitted votes will be filtered and weighted by IMDb to produce a weighted average for each movies.

From a historical standpoint, movies reflect our society and culture. As society changed, so did the movies. Digital technology was the driving force behind change. Digital 3D projection has largely replaced earlier problematic 3D film systems and has grown in popularity since the early 2010s. And movies have advanced rapidly since the 21st century. 
Therefore, we believe that by examining the characteristics of the most popular movies from 2000 to 2020, we can uncover some unexpected results and simplify your search for good movies.

We are trying to simply and show the complex relationships with our visualization, which exist between the votes and some influential factors ---- duration, language, casted actors and so on. Besides, we also try to explore whether there is a relationship between the votes and income & budget. Our visualization can give you a general overview of votes and its influential factors.

You may enjoy watching movies for the sake of entertainment and relaxation. Movies may provide you with a temporary escape from real life and the problems that surround you. 
Whatever group you belong to, our visualization will pique your interest.

If you don't know what videos you are watching, it is convenient for you just browse by category. If you just want to find a movie to pass the time, you can just open our website and choose from high to low.
You can select movies by country language and see the overall impact of country on ratings.



### 2 Dataset

#### 2.1 Dataset introduction

This project is based on dataset [IMDb Movies dataset from 2000 - 2020](https://www.kaggle.com/datasets/chenyanglim/imdb-v2/code) updated by CHEN YANG LIM, which containing 5,487 movies with their published dates, budgets, country, language, etc. All data are contained in one csv file [IMDB_Movies_2000_2020.csv](https://github.com/com-480-data-visualization/datavis-project-2022-bcd/blob/main/IMDB_Movies_2000_2020.csv) which consists of 5487 rows and  24 columns. Each row represents an instance of movies and columns show their attributes: 'imdb_title_id', 'title', 'original_title', 'year', 'date_published', 'genre', 'duration', 'country', 'language_1', 'language_2', 'language_3', 'director', 'writer', 'actors', 'actors_1', 'actors_f2', 'description', 'desc35', 'avg_vote', 'votes', 'budget', 'usa_gross_income', 'worlwide_gross_income', 'reviews_from_users'. Data are mostly clean and provided in String format. 

#### 2.2 Data pre-processing

* We noticed that 'budget' and  'worlwide_gross_income' columns involve different currencies and we have utilized [Currency Converter](https://pypi.org/project/CurrencyConverter/) package to unify the currencies into USA dollars based the exchange rate on 31-03-2021. We removed data which were not supported by the converter and those without real-time exchange rates.
* Since column 'country' lists all participated country in one string, we have split them and made a separate count for each country. Column 'actors' are processed in a similar way.
* We have combined 'language_1', 'language_2', 'language_3' to count in the aggregate for each language, ignoring the difference between original language and the translated versions.
* We have casted numbers in the form from 'str' into 'int' or 'float' type to facilitate later analysis and visualization. 

#### 2.3 Exploratory Data Analysis

Please check out content here: [Data analysis](https://github.com/com-480-data-visualization/datavis-project-2022-bcd/blob/main/Data_Visualization_M1.ipynb)


### 3 Related work

* What others have already done with the data?

  We have read the codes of this dataset and similar data related to movies on Kaggle and found out that most people are programming [Contents based recommender](https://www.kaggle.com/code/chenyanglim/content-based-recommender) using those datasets as inputs. 

* Why is your approach original?

  We have checked previous projects of COM-480 and only found one group visualizing similar data relevant to movies,  and details can be checked [here](). They had done the work based on [TMDB 5000 Movie Dataset](https://www.kaggle.com/datasets/tmdb/tmdb-movie-metadata), which is a minimized version of movie data provided by Kaggle. Since their website has already expired, we have watched their demo video. Their project was  focused on the genre and actors of movies, while ours will mainly concentrate on average votes, budget and income, which means our websites will be more likely to suit investors and audience looking for movies with high votes and high box office return. 

* What source of inspiration do you take? Visualizations that you found on other websites or magazines (might be unrelated to your data).

  We did acquire some inspirations from the websites exhibited in this course, such as [DuelingData-The Beatles](http://duelingdata.blogspot.com/2016/01/the-beatles.html), which is concise but informative as well. We would also like to set up a website as interactive and attractive as that one. And we prefer to let visitors gain a direct intuition and get a better understanding of the data, like the one [Facebook Map](https://www.facebook.com/notes/10158791468612200/) could do. 
