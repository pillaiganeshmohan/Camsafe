#!/usr/bin/python3
# -*- coding: utf-8 -*-
"""
根据https://github.com/TanFluent/facenet_opencv_dnn重新实现
转换模型，使用OpenCV进行推理
不依赖Tensorlow
"""
import os
from typing import List

import cv2
import numpy as np

from mtcnn_cv2 import MTCNN

class FaceNet(object):
    def __init__(self):
        """
        Initializes the FaceNet.
        """
        model_path = os.path.join(os.path.dirname(__file__), "graph_final.pb")
        self.model = cv2.dnn.readNetFromTensorflow(model_path)
        self.mtcnn = MTCNN()
    
    @staticmethod
    def prewhiten(x):
        mean = np.mean(x)
        std = np.std(x)
        std_adj = np.maximum(std, 1.0 / np.sqrt(x.size))
        y = np.multiply(np.subtract(x, mean), 1 / std_adj)
        return y

    def face_features(self, img_data:bytes, image_size: int=160, margin: int=44) -> List[np.ndarray]:
        features = []
        img = cv2.imdecode(np.frombuffer(img_data, np.uint8), cv2.IMREAD_COLOR)
        img = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)
        img_size = np.asarray(img.shape)[0:2]
        bounding_boxes = self.mtcnn.detect_faces(img)
        print(bounding_boxes)
        for box in bounding_boxes:
            det = box["box"]
            bb = np.zeros(4, dtype=np.int32)
            bb[0] = np.maximum(det[0] - margin / 2, 0)
            bb[1] = np.maximum(det[1] - margin / 2, 0)
            bb[2] = np.minimum(det[2] + margin / 2, img_size[1])
            bb[3] = np.minimum(det[3] + margin / 2, img_size[0])
            cropped = img[bb[1]:bb[1]+bb[3], bb[0]:bb[0]+bb[2], :]
            aligned = cv2.resize(cropped, (image_size, image_size), interpolation=cv2.INTER_LINEAR)
            prewhitened = FaceNet.prewhiten(aligned)
            # HWC -> CHW
            input_face_img = prewhitened.transpose([2, 0, 1])
            # CHW -> NCHW
            input_face_img = np.expand_dims(input_face_img, axis=0)
            self.model.setInput(input_face_img)
            _feature = self.model.forward()
            features.append(_feature.flatten())
        
        return features
  