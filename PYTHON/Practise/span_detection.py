import numpy as np
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.feature_extraction.text import CountVectorizer
from sklearn.naive_bayes import MultinomialNB
from sklearn.metrics import (
	confusion_matrix, classification_report, roc_curve,
	roc_auc_score, accuracy_score, precision_score, recall_score, f1_score
)
import matplotlib.pyplot as plt